from pydantic import BaseModel


class RecordCodingAttemptData(BaseModel):
    all_tags: list[str]
    all_problems: list[str]
    problems_to_tags: dict[str, list[str]]
