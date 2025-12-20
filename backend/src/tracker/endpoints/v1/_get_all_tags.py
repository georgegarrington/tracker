from tracker.db.fns import get_coding_tag_map
from tracker.db.utils._db_connection import db_connection


async def get_all_tags() -> list[str]:
    with db_connection() as conn:
        return list(get_coding_tag_map(conn).keys())
