from sqlite3 import Connection
from tracker.db.models._coding_attempt import CodingAttempt
from tracker.db.utils import parse_group_concat
from tracker.utils.misc import calculate_next_review
from dateutil import parser


def get_latest_coding_attempts(conn: Connection) -> list[CodingAttempt]:
    """
    Get joined view of coding attempt data
    """

    raw_rows = conn.execute(
        """

    WITH LatestAttempts AS (
        SELECT 
            id,
            problem_id,
            difficulty,
            attempt_time,
            minutes_taken,
            needed_help,
            notes,
            ROW_NUMBER() OVER (PARTITION BY problem_id ORDER BY attempt_time DESC) AS rn
        FROM coding_attempts
    ),
    ProblemTags AS (
        SELECT 
            cpt.problem_id,
            GROUP_CONCAT(ct.name, ', ') AS tag_list
        FROM coding_problem_tags cpt
        JOIN coding_tags ct ON ct.id = cpt.tag_id
        GROUP BY cpt.problem_id
    )
    SELECT 
        la.id,
        cp.name AS problem_name,
        la.difficulty,
        la.needed_help,
        la.attempt_time,
        la.minutes_taken,
        pt.tag_list,
        la.notes
    FROM LatestAttempts la
    JOIN coding_problems cp ON cp.id = la.problem_id
    LEFT JOIN ProblemTags pt ON pt.problem_id = la.problem_id
    WHERE la.rn = 1
    ORDER BY la.attempt_time DESC;

    """
    ).fetchall()

    return [
        CodingAttempt(
            id=attempt_id,
            priority=0,  # This is updated by the sorting algorithm
            problem_name=problem_name,
            proficiency=0.0,
            # proficiency=calculate_proficiency(difficulty, needed_help),
            difficulty=difficulty,
            needed_help=needed_help,
            attempt_time=attempt_time,
            next_review=calculate_next_review(
                parser.parse(attempt_time), difficulty, needed_help
            ),
            minutes_taken=minutes_taken,
            tags=parse_group_concat(raw_tags),
            notes=notes,
        )
        for (
            attempt_id,
            problem_name,
            difficulty,
            needed_help,
            attempt_time,
            minutes_taken,
            raw_tags,
            notes,
        ) in raw_rows
    ]

    # pass
