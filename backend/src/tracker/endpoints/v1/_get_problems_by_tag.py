from tracker.db.fns import get_problems_by_tag as db_get_problems_by_tag
from tracker.db.utils._db_connection import db_connection
from tracker.endpoints.v1.models.responses._problems_by_tag import ProblemsByTag


async def get_problems_by_tag() -> ProblemsByTag:
    """
    Get problems grouped by their tags
    """

    with db_connection() as conn:
        problems_by_tag = db_get_problems_by_tag(conn)
        return ProblemsByTag(problems_by_tag=problems_by_tag)
