from sqlite3 import Connection
from tracker.db.utils import parse_group_concat


def get_problems_by_tag(conn: Connection) -> dict[str, list[str]]:
    """
    Get problems grouped by their tags using an efficient join query.
    Returns a dictionary mapping tag names to lists of problem names.
    """
    
    rows = conn.execute(
        """
        SELECT 
            ct.name AS tag_name,
            GROUP_CONCAT(cp.name, ', ') AS problem_list
        FROM coding_tags ct
        LEFT JOIN coding_problem_tags cpt ON ct.id = cpt.tag_id
        LEFT JOIN coding_problems cp ON cpt.problem_id = cp.id
        GROUP BY ct.id, ct.name
        ORDER BY ct.name;
        """
    ).fetchall()
    
    return {
        tag_name: parse_group_concat(problem_list)
        for tag_name, problem_list in rows
    }
