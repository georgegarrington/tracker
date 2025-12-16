from pydantic import BaseModel
from tracker.types import Difficulty, NeededHelp

class RecordCodingAttemptRequest(BaseModel):
    problem: str
    difficulty: Difficulty
    needed_help: NeededHelp
    minutes_taken: int
    tags: list[str]
    url: None | str
    notes: None | str