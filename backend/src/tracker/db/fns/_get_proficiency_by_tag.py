from sqlite3 import Connection
from typing import Iterable, NamedTuple

ignored_tags = ["leetcode", "neetcode", "winton", "irrelevant"]


class TagStats(NamedTuple):
    proficiency: float
    problem_count: int


def get_proficiency_by_tag(conn: Connection) -> dict[str, TagStats]:
    rows: Iterable[tuple[str, float, int]] = conn.execute(
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
            ) AS proficiency,
            COUNT(DISTINCT cpt.problem_id) AS problem_count
        FROM coding_tags ct
        JOIN coding_problem_tags cpt ON ct.id = cpt.tag_id
        JOIN coding_attempts ca ON cpt.problem_id = ca.problem_id
        GROUP BY ct.id, ct.name
        ORDER BY proficiency DESC;
        """
    ).fetchall()

    return {
        tag_name: TagStats(proficiency=proficiency, problem_count=problem_count)
        for tag_name, proficiency, problem_count in rows
        if tag_name.lower() not in ignored_tags
    }
