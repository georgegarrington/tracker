from sqlite3 import Connection
# from tracker.db.utils._db_connection import db_connection


def get_coding_problem_map(conn: Connection) -> dict[str, int]:
    rows = conn.execute(
        """
        SELECT name, id FROM coding_problems;
        """
    ).fetchall()

    return dict(rows)
