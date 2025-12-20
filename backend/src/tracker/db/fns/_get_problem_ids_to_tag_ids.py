from sqlite3 import Connection
from tracker.db.utils._parse_group_concat import parse_group_concat


def get_problem_ids_to_tag_ids(conn: Connection) -> dict[int, list[int]]:
    query = """
        SELECT problem_id, GROUP_CONCAT(tag_id, ',') AS tag_ids
        FROM coding_problem_tags GROUP BY problem_id;
    """

    rows = conn.execute(query).fetchall()

    return {
        problem_id: parse_group_concat(tag_ids, mapper=int)
        for problem_id, tag_ids in rows
    }
