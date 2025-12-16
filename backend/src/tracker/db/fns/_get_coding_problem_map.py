from tracker.db.utils._db_connection import db_connection

def get_coding_problem_map() -> dict[str, int]:

    with db_connection() as conn:

        rows = conn.execute(
            """
            SELECT name, id FROM coding_problems;
            """
        ).fetchall()

        return dict(rows)