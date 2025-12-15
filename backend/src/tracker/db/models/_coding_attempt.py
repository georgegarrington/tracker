from typing import NamedTuple
from tracker.types import Difficulty, NeededHelp
import datetime

class CodingAttempt(NamedTuple):
    problem_name: str
    difficulty: Difficulty
    needed_help: NeededHelp
    attempt_time: datetime.datetime
    seconds_taken: int
    tags: list[str]
    notes: str | None