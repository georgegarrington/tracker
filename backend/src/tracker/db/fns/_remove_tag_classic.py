from sqlite3 import Connection


def remove_tag_classic(
    conn: Connection,
    tag_id: int,
    problem_id: int,
) -> None:
    """Remove a classic problem from a tag."""
    conn.execute(
        """
        DELETE FROM coding_tag_classics
        WHERE tag_id = ? AND problem_id = ?;
        """,
        (tag_id, problem_id),
    )
