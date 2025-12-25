import datetime

from tracker.types import Difficulty, NeededHelp


def calculate_next_review(
    attempt_time: datetime.datetime,
    difficulty: Difficulty,
    needed_help: NeededHelp,
) -> None | datetime.datetime:
    if difficulty == "Hard" or needed_help == "Yes":
        return attempt_time + datetime.timedelta(days=3)
    elif difficulty == "Medium" or needed_help == "Some":
        return attempt_time + datetime.timedelta(days=7)
    else:
        return None
