from tracker.db.utils import db_connection

def add_coding_tag(name: str) -> None:

    with db_connection() as conn:
        conn.execute(
            """
            INSERT INTO coding_tags (name)
            VALUES (?);
            """,
            (name,),
        )