from datetime import datetime
import itertools
from tracker.db.models._coding_attempt import CodingAttempt
from tracker.settings import get_settings


def sort_by_priority(
    attempts: list[CodingAttempt],
    classics_by_tag: dict[str, list[str]],
    proficiency_by_tag: dict[str, float],
) -> list[CodingAttempt]:
    """
    Sort coding attempts by priority algorithm:

    1. Classics NOT graduated (not "Easy + No Help") that are due for review
    2. 60/40 mix of classics/non-classics, with ungraduated sorted higher within each

    A problem "graduates" when its latest attempt is Easy + No Help.
    """

    settings = get_settings()
    classics_ratio = settings.CLASSICS_RATIO
    now = datetime.now()

    # Build set of all classic problem names
    all_classics: set[str] = set(itertools.chain.from_iterable(classics_by_tag.values()))

    def get_worst_proficiency(attempt: CodingAttempt) -> float:
        proficiencies = [proficiency_by_tag.get(tag, 0.0) for tag in attempt.tags]
        return min(proficiencies) if proficiencies else 0.0

    def is_graduated(attempt: CodingAttempt) -> bool:
        """Check if attempt is 'graduated' (Easy + No Help)."""
        return attempt.difficulty == "Easy" and attempt.needed_help == "No"

    def is_classic(attempt: CodingAttempt) -> bool:
        return attempt.problem_name in all_classics

    def is_due_for_review(attempt: CodingAttempt) -> bool:
        """Check if due for spaced rep review (>= 3 days since last attempt)."""
        days_since = (now - attempt.attempt_time).days
        return days_since >= 3

    def get_review_urgency(attempt: CodingAttempt) -> float:
        """Get spaced rep urgency (higher = more overdue)."""
        days_since = (now - attempt.attempt_time).days
        if days_since >= 14:
            return 3.0 + (days_since - 14) / 7
        elif days_since >= 7:
            return 2.0 + (days_since - 7) / 7
        elif days_since >= 3:
            return 1.0 + (days_since - 3) / 4
        return 0.0

    # Partition attempts into buckets
    bucket_urgent: list[CodingAttempt] = []  # Classics due for review, not graduated
    bucket_classics: list[CodingAttempt] = []  # Other classics
    bucket_others: list[CodingAttempt] = []  # Non-classics

    for attempt in attempts:
        if is_classic(attempt):
            if not is_graduated(attempt) and is_due_for_review(attempt):
                bucket_urgent.append(attempt)
            else:
                bucket_classics.append(attempt)
        else:
            bucket_others.append(attempt)

    # Sort bucket_urgent by: urgency (desc), then worst proficiency (asc)
    bucket_urgent.sort(key=lambda a: (-get_review_urgency(a), get_worst_proficiency(a)))

    # Sort classics and others by: ungraduated first, then worst proficiency
    def sort_key(attempt: CodingAttempt) -> tuple[int, float]:
        graduated_penalty = 1 if is_graduated(attempt) else 0
        return (graduated_penalty, get_worst_proficiency(attempt))

    bucket_classics.sort(key=sort_key)
    bucket_others.sort(key=sort_key)

    # Interleave classics and others with configured ratio
    mixed: list[CodingAttempt] = []
    i_classics, i_others = 0, 0

    while i_classics < len(bucket_classics) or i_others < len(bucket_others):
        if i_classics >= len(bucket_classics):
            mixed.append(bucket_others[i_others])
            i_others += 1
        elif i_others >= len(bucket_others):
            mixed.append(bucket_classics[i_classics])
            i_classics += 1
        else:
            classics_count = sum(1 for a in mixed if is_classic(a))
            current_ratio = classics_count / len(mixed) if mixed else 0.0

            if current_ratio < classics_ratio:
                mixed.append(bucket_classics[i_classics])
                i_classics += 1
            else:
                mixed.append(bucket_others[i_others])
                i_others += 1

    return bucket_urgent + mixed
