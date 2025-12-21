from sqlite3 import Connection
from tracker.db.utils import parse_group_concat


def get_coding_tag_classics(conn: Connection, tag_id: int) -> list[int]:
    """Get all classic problem IDs for a given tag."""
    cursor = conn.execute(
        """
        SELECT problem_id
        FROM coding_tag_classics
        WHERE tag_id = ?
        """,
        (tag_id,),
    )
    return [row[0] for row in cursor.fetchall()]


def get_coding_classics_by_tag(conn: Connection) -> dict[str, list[str]]:
    """
    Get classic problems grouped by their tags.
    Returns a dictionary mapping tag names to lists of classic problem names.
    """

    rows = conn.execute(
        """
        SELECT 
            ct.name AS tag_name,
            GROUP_CONCAT(cp.name, ', ') AS problem_list
        FROM coding_tags ct
        LEFT JOIN coding_tag_classics ctc ON ct.id = ctc.tag_id
        LEFT JOIN coding_problems cp ON ctc.problem_id = cp.id
        GROUP BY ct.id, ct.name
        ORDER BY ct.name;
        """
    ).fetchall()

    return {
        tag_name: parse_group_concat(problem_list) for tag_name, problem_list in rows
    }
