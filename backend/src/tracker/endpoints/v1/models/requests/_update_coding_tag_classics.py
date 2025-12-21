from pydantic import BaseModel


class UpdateTagClassicsRequest(BaseModel):
    tag: str
    added_classics: list[str]  # Problem names to add as classics
    removed_classics: list[str]  # Problem names to remove from classics
