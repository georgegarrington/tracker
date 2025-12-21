from tracker.db.fns import get_coding_classics_by_tag as db_get_coding_classics_by_tag
from tracker.db.utils._db_connection import db_connection
from tracker.endpoints.v1.models.responses._classics_by_tag import ClassicsByTag


async def get_coding_classics_by_tag() -> ClassicsByTag:
    """
    Get classic problems grouped by their tags
    """

    with db_connection() as conn:
        classics_by_tag = db_get_coding_classics_by_tag(conn)
        return ClassicsByTag(classics_by_tag=classics_by_tag)
