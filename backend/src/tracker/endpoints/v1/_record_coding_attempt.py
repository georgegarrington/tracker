from sqlite3 import Connection
from tracker.db.utils._db_connection import db_connection
from tracker.endpoints.v1.models.requests import RecordCodingAttemptRequest
from tracker.db.fns import (
    get_coding_tag_map,
    get_coding_problem_map,
    add_coding_problem,
    add_coding_tag,
    remove_coding_tag_link,
    add_coding_tag_link,
    add_coding_attempt,
)


def update_tags(conn: Connection, tags: list[str], problem_id: int) -> None:
    tag_map = get_coding_tag_map(conn)
    existing_tags = set(tag_map.keys())

    new_tags = set(tags) - existing_tags
    removed_tags = existing_tags - set(tags)

    for tag in new_tags:
        new_tag_id = add_coding_tag(conn=conn, name=tag)
        add_coding_tag_link(conn=conn, problem_id=problem_id, tag_id=new_tag_id)

    for tag in removed_tags:
        tag_id = tag_map[tag]
        remove_coding_tag_link(conn=conn, problem_id=problem_id, tag_id=tag_id)

    # return {tag: tag_map[tag] for tag in tags if tag in tag_map}


async def record_coding_attempt(request: RecordCodingAttemptRequest) -> None:
    """
    * Get all existing problems - check if this is a new problem or not.
    * If it is then create it in the DB
    * Get all existings tags - check if any tags are new then create them
    * Check
    """

    with db_connection() as conn:
        if not (problem_id := get_coding_problem_map(conn).get(request.problem)):
            problem_id = add_coding_problem(
                conn=conn,
                name=request.problem,
                url=request.url,
            )

        update_tags(conn, request.tags, problem_id)

        add_coding_attempt(
            conn=conn,
            problem_id=problem_id,
            difficulty=request.difficulty,
            needed_help=request.needed_help,
            minutes_taken=request.minutes_taken,
            notes=request.notes,
            attempt_time=request.time,
        )
