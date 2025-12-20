from tracker.db.fns import get_coding_tag_map, get_coding_problem_map
from tracker.db.utils._db_connection import db_connection
from tracker.endpoints.v1.models.responses._record_coding_attempt_data import (
    RecordCodingAttemptData,
)


async def get_record_coding_attempt_data() -> RecordCodingAttemptData:
    """
    Get the list of existing tags, and list of existing problems
    """

    with db_connection() as conn:
        tags_to_tag_ids = get_coding_tag_map(conn)
        problems_to_problem_ids = get_coding_problem_map(conn)

        return RecordCodingAttemptData(
            tags=list(tags_to_tag_ids.keys()),
            problems=list(problems_to_problem_ids.keys()),
        )


__all__ = [
    "get_record_coding_attempt_data",
]
