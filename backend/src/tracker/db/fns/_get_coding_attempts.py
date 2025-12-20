from tracker.db.utils import db_connection

GEMINI = """

WITH LatestAttempts AS (
    SELECT 
        problem_id,
        difficulty,
        attempt_time,
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
    cp.name AS problem_name,
    la.difficulty,
    la.attempt_time,
    pt.tag_list AS tags,
    la.notes
FROM LatestAttempts la
JOIN coding_problems cp ON cp.id = la.problem_id
LEFT JOIN ProblemTags pt ON pt.problem_id = la.problem_id
WHERE la.rn = 1
ORDER BY la.attempt_time DESC;

"""


def get_coding_attempts() -> None:
    """
    Get joined view of coding attempt data
    """

    with db_connection() as conn:
        conn.execute(
            """

        WITH ranked_attempts AS (
            SELECT 
                ca.*,
                ROW_NUMBER() OVER (PARTITION BY problem_id ORDER BY attempt_time DESC) AS rn
            FROM coding_attempts ca
        )
        SELECT 
            cp.name AS problem_name,
            ra.difficulty,
            ra.attempt_time,
            GROUP_CONCAT(ct.name, ', ') AS tags,
            ra.notes
        FROM ranked_attempts ra
        JOIN coding_problems cp ON cp.id = ra.problem_id
        LEFT JOIN coding_problem_tags cpt ON cpt.problem_id = ra.problem_id
        LEFT JOIN coding_tags ct ON ct.id = cpt.tag_id
        WHERE ra.rn = 1
        GROUP BY cp.name, ra.difficulty, ra.attempt_time, ra.notes
        ORDER BY ra.attempt_time DESC;
        """
        )

    # pass
