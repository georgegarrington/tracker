from sqlite3 import Connection


def get_coding_tag_map(conn: Connection) -> dict[str, int]:
    rows = conn.execute(
        """
        SELECT name, id FROM coding_tags;
        """
    ).fetchall()

    return dict(rows)
