
from collections import defaultdict
import datetime
import itertools
import random
from tracker.db.models._coding_attempt import CodingAttempt
from tracker.utils.misc._calculate_attempt_proficiency import calculate_attempt_proficiency
import more_itertools

def sort_by_priority(
    unsorted_attempts: list[CodingAttempt],
    classics_by_tag: dict[str, list[str]],
    proficiency_by_tag: dict[str, float],
) -> list[CodingAttempt]:
    """
    * First, sort by worst tag proficiency
    * Then, sort by "is classic"
    * Then, sort for oldest "due for review" first - 3/7 days + last attempt time depending on if last attempt was hard/medium
    * Then, randomise the remaining problems (which are all graduated)
    """

    all_classic_problems: set[str] = set(itertools.chain.from_iterable(classics_by_tag.values()))

    graduated_attempts: list[CodingAttempt] = []

    # First group attempts by tag (using the worst proficient tag as a tie-breaker if multiple tags)
    attempts_by_tag: dict[str, list[CodingAttempt]] = defaultdict(list)
    for attempt in unsorted_attempts:

        if calculate_attempt_proficiency(attempt.difficulty, attempt.needed_help) == 1:
            graduated_attempts.append(attempt)
            continue

        worst_tag_of_attempt = min(
            attempt.tags, 
            key = lambda tag: proficiency_by_tag.get(tag, 0.0)
        )
        attempts_by_tag[worst_tag_of_attempt].append(attempt)

    # Sort attempts within each tag by 1. are they classic, and 2. soonest upcoming review date
    for tag_attempts in attempts_by_tag.values():
        tag_attempts.sort(
            key=lambda a: 
            [
                -(a.problem_name in all_classic_problems),  # Classics first
                (a.next_review or datetime.datetime.max).timestamp(),
            ]
        )

    tag_problem_pairs_in_worst_order = (
        problems for _, problems in
    sorted(
        attempts_by_tag.items(),
        key=lambda item: proficiency_by_tag.get(item[0], 0.0)
    ))

    random.shuffle(graduated_attempts)
    sorted_attempts: list[CodingAttempt] = [
        *more_itertools.roundrobin(*tag_problem_pairs_in_worst_order),
        *graduated_attempts,
    ]

    priority_counter = itertools.count()
    for attempt in sorted_attempts:
        attempt.priority = next(priority_counter)
    
    return sorted_attempts

    # cycler = itertools.cycle(tag_problem_pairs_in_worst_order)

    # while (remaining_problems := next(cycler))

    # pass