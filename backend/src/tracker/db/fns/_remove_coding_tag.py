from sqlite3 import Connection


def remove_coding_tag(
    conn: Connection,
    tag_id: int,
) -> None:
    conn.execute(
        """
        DELETE FROM coding_tags
        WHERE id = ?
        """,
        (tag_id,),
    )
