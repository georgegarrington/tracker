from pydantic import BaseModel


class ProblemsByTag(BaseModel):
    problems_by_tag: dict[str, list[str]]
