from tracker.db.utils._db_connection import db_connection

def get_all_coding_problems() -> list[str]:

    with db_connection() as conn:

        rows = conn.execute(
            """
            SELECT name FROM coding_problems
            """
        ).fetchall()

        return [tup[0] for tup in rows]