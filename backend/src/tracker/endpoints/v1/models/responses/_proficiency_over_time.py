from pydantic import BaseModel


class TagDataPoint(BaseModel):
    attempt_time: str
    proficiency: float


class ProficiencyOverTime(BaseModel):
    data_by_tag: dict[str, list[TagDataPoint]]
