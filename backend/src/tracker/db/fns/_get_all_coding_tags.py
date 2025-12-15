from tracker.db.utils._db_connection import db_connection

def get_all_coding_tags() -> dict[str, int]:

    with db_connection() as conn:

        rows = conn.execute(
            """
            SELECT name, id FROM coding_tags;
            """
        ).fetchall()

        return dict(rows)