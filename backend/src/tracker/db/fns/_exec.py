from typing import Any

from tracker.db.utils._db_connection import db_connection


def exec(query: str) -> Any:
    with db_connection() as conn:
        result = conn.execute(query)
        return result.fetchall()
