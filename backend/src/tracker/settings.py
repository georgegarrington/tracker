from pydantic_settings import BaseSettings
from functools import cache

class Settings(BaseSettings):

    PORT: int = 8791

    pass

@cache
def get_settings() -> Settings:
    return Settings() 