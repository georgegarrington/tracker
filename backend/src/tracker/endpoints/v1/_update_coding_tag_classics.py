from tracker.db.utils._db_connection import db_connection
from tracker.db.fns import (
    get_coding_tag_map,
    get_coding_problem_map,
    add_coding_tag_classic,
    remove_tag_classic,
)
from tracker.endpoints.v1.models.requests import UpdateTagClassicsRequest


async def update_coding_tag_classics(request: UpdateTagClassicsRequest) -> None:
    """
    Update the classic problems for a tag by applying a delta of added/removed classics.
    """

    with db_connection() as conn:
        tag_map = get_coding_tag_map(conn)
        problem_map = get_coding_problem_map(conn)

        tag_id = tag_map.get(request.tag)
        if tag_id is None:
            raise ValueError(f"Tag '{request.tag}' not found")

        # Process added classics
        for problem_name in request.added_classics:
            problem_id = problem_map.get(problem_name)
            if problem_id is None:
                raise ValueError(f"Problem '{problem_name}' not found")
            add_coding_tag_classic(conn, tag_id, problem_id)

        # Process removed classics
        for problem_name in request.removed_classics:
            problem_id = problem_map.get(problem_name)
            if problem_id is None:
                raise ValueError(f"Problem '{problem_name}' not found")
            remove_tag_classic(conn, tag_id, problem_id)
