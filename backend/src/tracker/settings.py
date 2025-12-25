from pydantic_settings import BaseSettings
from functools import cache


class Settings(BaseSettings):
    PORT: int = 8791
    DB_PATH: str = "/Users/georgegarrington/Documents/trackerdb"
    BACKUP_DIR: str = "/Users/georgegarrington/source/tracker/backup"
    SQL_BACKUP: str = "/Users/georgegarrington/source/tracker/backup/bkup.sql"
    CLASSICS_RATIO: float = 0.6  # 60% classics, 40% non-classics in priority sorting


@cache
def get_settings() -> Settings:
    return Settings()
