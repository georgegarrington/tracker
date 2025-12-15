
import sqlite3
from tracker.settings import get_settings

def db_connection() -> sqlite3.Connection:
    settings = get_settings()
    conn = sqlite3.connect(settings.DB_PATH)
    return conn