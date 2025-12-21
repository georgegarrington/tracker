from pydantic import BaseModel


class ClassicsByTag(BaseModel):
    classics_by_tag: dict[str, list[str]]
