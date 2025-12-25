from sqlite3 import Connection
from typing import Iterable

ignored_tags = [
    "leetcode", "neetcode", "winton", "irrelevant"
]

def get_proficiency_by_tag(conn: Connection) -> dict[str, float]:
    
    rows: Iterable[tuple[str, float]] = conn.execute(
        """
        SELECT
            ct.name AS tag_name,
            AVG(
                (
                    CASE ca.difficulty
                        WHEN 'Easy' THEN 1.0
                        WHEN 'Medium' THEN 0.5
                        ELSE 0.0
                    END
                    +
                    CASE ca.needed_help
                        WHEN 'No' THEN 1.0
                        WHEN 'Kinda' THEN 0.5
                        ELSE 0.0
                    END
                ) / 2.0
            ) AS proficiency
        FROM coding_tags ct
        JOIN coding_problem_tags cpt ON ct.id = cpt.tag_id
        JOIN coding_attempts ca ON cpt.problem_id = ca.problem_id
        GROUP BY ct.id, ct.name
        ORDER BY proficiency DESC;
        """
    ).fetchall()

    return {tag_name: proficiency for tag_name, proficiency in rows if tag_name.lower() not in ignored_tags}