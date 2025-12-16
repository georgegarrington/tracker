from pydantic import BaseModel

class RecordCodingAttemptData(BaseModel):
    tags: list[str]
    problems: list[str]