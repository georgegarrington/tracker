from pydantic import BaseModel
from tracker.types import Difficulty, NeededHelp
import datetime


class RecordCodingAttemptRequest(BaseModel):
    problem: str
    difficulty: Difficulty
    needed_help: NeededHelp
    time: datetime.datetime
    minutes_taken: int
    tags: list[str]
    url: None | str
    notes: None | str
