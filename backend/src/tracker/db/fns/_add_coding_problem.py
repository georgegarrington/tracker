from tracker.db.utils import db_connection

def add_coding_problem(
        name: str,
        source: str,
        url: str | None = None,
    ) -> None:

    with db_connection() as conn:
        conn.execute(
            """
            INSERT INTO coding_problems 
            (
            name,
            source,
            url
            )
            VALUES 
            (
            ?, ?, ?
            );
            """,
            (name, source, url),
        )