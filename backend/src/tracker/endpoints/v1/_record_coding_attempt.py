from sqlite3 import Connection
from tracker.db.fns._remove_coding_tag import remove_coding_tag
from tracker.db.fns._tag_is_used import tag_is_used
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
    get_problem_ids_to_tag_ids,
)
from tracker.utils.misc._flip_dict import flip_dict


def update_tags(conn: Connection, tags: list[str], problem_id: int) -> tuple[dict[str, int], set[str]]:
    
    tag_map = get_coding_tag_map(conn)
    ids_to_tags = flip_dict(tag_map)
    all_existing_tags = set(tag_map.keys())

    requested_tag_set = set(tags)
    completely_new_tags = requested_tag_set - all_existing_tags

    for tag in completely_new_tags:
        new_tag_id = add_coding_tag(conn=conn, name=tag)
        tag_map[tag] = new_tag_id

    existing_problem_tags = get_problem_ids_to_tag_ids(conn).get(problem_id, [])
    existing_tags = set(ids_to_tags[id_] for id_ in existing_problem_tags)
    print("Existing tags for problem:", existing_tags)
    removed_tags = existing_tags - requested_tag_set
    new_tags = requested_tag_set - existing_tags

    for tag in removed_tags:
        tag_id = tag_map[tag]
        remove_coding_tag_link(conn=conn, problem_id=problem_id, tag_id=tag_id)

    for tag in new_tags:
        tag_id = tag_map[tag]
        add_coding_tag_link(conn=conn, problem_id=problem_id, tag_id=tag_id)

    return tag_map, removed_tags

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

        tag_map, removed_tags = update_tags(conn, request.tags, problem_id)

        add_coding_attempt(
            conn=conn,
            problem_id=problem_id,
            difficulty=request.difficulty,
            needed_help=request.needed_help,
            minutes_taken=request.minutes_taken,
            notes=request.notes,
            attempt_time=request.time,
        )

    # Then, in a separate transaction, check if any of the removed tags are unused by any problem, then remove them

    with db_connection() as conn:

        for tag in removed_tags:
            print("Checking tag for removal:", tag)
            tag_id = tag_map[tag]
            print("Tag ID:", tag_id)
            if not tag_is_used(conn, tag_id):
                print("Tag unused")
                remove_coding_tag(conn, tag_id)
            else:
                print("Tag still used")
