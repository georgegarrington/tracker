from sqlite3 import Connection


def tag_is_used(conn: Connection, tag_id: int) -> bool:
    return bool(
        conn.execute(
            """
            SELECT * FROM coding_problem_tags WHERE tag_id = ? LIMIT 1
            """,
            (tag_id,),
        ).fetchone()
    )
