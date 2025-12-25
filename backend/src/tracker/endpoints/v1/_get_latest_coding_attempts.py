from tracker.db.fns import (
    get_latest_coding_attempts as db_get_latest_coding_attempts,
    get_coding_classics_by_tag,
    get_proficiency_by_tag,
)
from tracker.db.models._coding_attempt import CodingAttempt
from tracker.db.utils import db_connection
from tracker.utils.misc import sort_by_priority


async def get_latest_coding_attempts() -> list[CodingAttempt]:
    """
    Does a DB join on all data to create the view in the webapp,
    sorted by priority algorithm.
    """

    with db_connection() as conn:
        attempts = db_get_latest_coding_attempts(conn)
        classics_by_tag = get_coding_classics_by_tag(conn)
        proficiency_by_tag = get_proficiency_by_tag(conn)

    return sort_by_priority(attempts, classics_by_tag, proficiency_by_tag)
