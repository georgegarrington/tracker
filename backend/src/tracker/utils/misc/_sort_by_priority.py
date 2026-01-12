from collections import defaultdict
import datetime
import itertools
import random
from tracker.db.fns._get_proficiency_by_tag import TagStats
from tracker.db.models._coding_attempt import CodingAttempt
from tracker.utils.misc._calculate_attempt_proficiency import (
    calculate_attempt_proficiency,
)
import more_itertools

MIN_PROBLEMS_FOR_TAG_PRIORITY = 4


def sort_by_priority(
    unsorted_attempts: list[CodingAttempt],
    classics_by_tag: dict[str, list[str]],
    proficiency_by_tag: dict[str, TagStats],
) -> list[CodingAttempt]:
    """
    * First, sort by worst tag proficiency (only tags with 4+ problems)
    * Then, sort by "is classic"
    * Then, sort for oldest "due for review" first - 3/7 days + last attempt time depending on if last attempt was hard/medium
    * Then, problems with only low-count tags, sorted by avg proficiency / oldest review
    * Then, randomise the remaining problems (which are all graduated)
    """

    all_classic_problems: set[str] = set(
        itertools.chain.from_iterable(classics_by_tag.values())
    )

    graduated_attempts: list[CodingAttempt] = []
    low_count_tag_attempts: list[CodingAttempt] = []

    now = datetime.datetime.now()

    # Tags with enough problems to be prioritised
    priority_tags = {
        tag
        for tag, stats in proficiency_by_tag.items()
        if stats.problem_count >= MIN_PROBLEMS_FOR_TAG_PRIORITY
    }

    # First group attempts by tag (using the worst proficient tag as a tie-breaker if multiple tags)
    attempts_by_tag: dict[str, list[CodingAttempt]] = defaultdict(list)
    for attempt in unsorted_attempts:
        if attempt.next_review and attempt.next_review > now:
            continue

        if calculate_attempt_proficiency(attempt.difficulty, attempt.needed_help) == 1:
            graduated_attempts.append(attempt)
            continue

        # Filter to only tags that have proficiency data (excludes ignored tags) AND have enough problems
        valid_tags = [t for t in attempt.tags if t in priority_tags]
        if not valid_tags:
            # Problem only has low-count tags - add to secondary list
            low_count_tag_attempts.append(attempt)
            continue
        worst_tag_of_attempt = min(
            valid_tags, key=lambda tag: proficiency_by_tag[tag].proficiency
        )
        attempts_by_tag[worst_tag_of_attempt].append(attempt)

    # Sort attempts within each tag by 1. are they classic, and 2. soonest upcoming review date
    for tag_attempts in attempts_by_tag.values():
        tag_attempts.sort(
            key=lambda a: [
                -(a.problem_name in all_classic_problems),  # Classics first
                (a.next_review or datetime.datetime.max).timestamp(),
            ]
        )

    problem_lists_in_worst_order = (
        problems
        for _, problems in sorted(
            attempts_by_tag.items(),
            key=lambda item: proficiency_by_tag[item[0]].proficiency,
        )
    )

    # Sort low-count tag attempts by average proficiency of their tags, then oldest review
    def avg_proficiency(attempt: CodingAttempt) -> float:
        valid = [
            proficiency_by_tag[t].proficiency
            for t in attempt.tags
            if t in proficiency_by_tag
        ]
        return sum(valid) / len(valid) if valid else 1.0

    low_count_tag_attempts.sort(
        key=lambda a: (
            avg_proficiency(a),
            (a.next_review or datetime.datetime.max).timestamp(),
        )
    )

    random.shuffle(graduated_attempts)
    sorted_attempts: list[CodingAttempt] = [
        *more_itertools.roundrobin(*problem_lists_in_worst_order),
        *low_count_tag_attempts,
        *graduated_attempts,
    ]

    priority_counter = itertools.count()
    for attempt in sorted_attempts:
        attempt.priority = next(priority_counter)

    return sorted_attempts
