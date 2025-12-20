from sqlite3 import Connection


def add_coding_problem(
    conn: Connection,
    name: str,
    url: str | None = None,
) -> int:
    cursor = conn.execute(
        """
        INSERT INTO coding_problems 
        (
        name,
        url
        )
        VALUES 
        (
        ?, ?
        );
        """,
        (name, url),
    )

    if not (row_id := cursor.lastrowid):
        raise Exception("Failed to insert new coding problem")

    return row_id
