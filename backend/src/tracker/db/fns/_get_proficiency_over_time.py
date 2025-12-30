from sqlite3 import Connection
from typing import Iterable

from ._get_proficiency_by_tag import ignored_tags


def _calculate_proficiency(difficulty: str, needed_help: str) -> float:
    difficulty_score = {"Easy": 1.0, "Medium": 0.5, "Hard": 0.0}.get(difficulty, 0.0)
    help_score = {"No": 1.0, "Kinda": 0.5, "Yes": 0.0}.get(needed_help, 0.0)
    return (difficulty_score + help_score) / 2.0


def get_proficiency_over_time(
    conn: Connection,
) -> dict[str, list[dict[str, str | float]]]:
    """
    Get running average proficiency per tag over time.
    Returns a dict mapping tag_name -> list of {attempt_time, proficiency} points.
    Each point represents the running average proficiency for that tag up to that attempt.
    """

    rows: Iterable[tuple[str, str, str, str]] = conn.execute(
        """
        SELECT
            ct.name AS tag_name,
            ca.attempt_time,
            ca.difficulty,
            ca.needed_help
        FROM coding_attempts ca
        JOIN coding_problem_tags cpt ON ca.problem_id = cpt.problem_id
        JOIN coding_tags ct ON ct.id = cpt.tag_id
        ORDER BY ca.attempt_time ASC
        """
    ).fetchall()

    # Track running totals per tag
    tag_totals: dict[str, float] = {}
    tag_counts: dict[str, int] = {}
    result: dict[str, list[dict[str, str | float]]] = {}

    for tag_name, attempt_time, difficulty, needed_help in rows:
        if tag_name.lower() in ignored_tags:
            continue

        proficiency = _calculate_proficiency(difficulty, needed_help)

        # Update running totals
        tag_totals[tag_name] = tag_totals.get(tag_name, 0.0) + proficiency
        tag_counts[tag_name] = tag_counts.get(tag_name, 0) + 1

        # Calculate running average
        running_avg = tag_totals[tag_name] / tag_counts[tag_name]

        # Add data point
        if tag_name not in result:
            result[tag_name] = []

        result[tag_name].append(
            {"attempt_time": attempt_time, "proficiency": running_avg}
        )

    return result
