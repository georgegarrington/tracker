# from typing import NamedTuple
from tracker.types import Difficulty, NeededHelp
import datetime
from pydantic import BaseModel


class CodingAttempt(BaseModel):
    id: int
    priority: int
    proficiency: float
    problem_name: str
    difficulty: Difficulty
    needed_help: NeededHelp
    attempt_time: datetime.datetime
    next_review: None | datetime.datetime
    minutes_taken: int
    tags: list[str]
    notes: str | None
