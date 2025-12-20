from tracker.db.fns import get_coding_attempts as db_get_coding_attempts
from tracker.db.models._coding_attempt import CodingAttempt
from tracker.db.utils import db_connection


async def get_coding_attempts() -> list[CodingAttempt]:
    """
    Does a DB join on all data to create the view in the webapp
    """

    with db_connection() as conn:
        return db_get_coding_attempts(conn)
