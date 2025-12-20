from sqlite3 import Connection


def remove_coding_tag_link(
    conn: Connection,
    problem_id: int,
    tag_id: int,
) -> None:
    conn.execute(
        """
        DELETE FROM coding_problem_tags
        WHERE problem_id = ? AND tag_id = ?
        """,
        (problem_id, tag_id),
    )
