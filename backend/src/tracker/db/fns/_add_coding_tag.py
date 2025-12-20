from sqlite3 import Connection


def add_coding_tag(conn: Connection, name: str) -> int:
    cursor = conn.execute(
        """
        INSERT INTO coding_tags (name)
        VALUES (?);
        """,
        (name,),
    )
    if not (row_id := cursor.lastrowid):
        raise Exception("Failed to insert new coding tag")
    return row_id
