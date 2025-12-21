# from typing import NamedTuple
from tracker.types import Difficulty, NeededHelp
import datetime
from pydantic import BaseModel


class CodingAttempt(BaseModel):
    id: int
    problem_name: str
    difficulty: Difficulty
    needed_help: NeededHelp
    attempt_time: datetime.datetime
    next_review: datetime.datetime
    minutes_taken: int
    tags: list[str]
    notes: str | None
