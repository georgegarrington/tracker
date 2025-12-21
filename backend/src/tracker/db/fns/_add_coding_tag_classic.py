from sqlite3 import Connection


def add_coding_tag_classic(
    conn: Connection,
    tag_id: int,
    problem_id: int,
) -> None:
    """Add a classic problem for a tag."""
    conn.execute(
        """
        INSERT INTO coding_tag_classics
        (
        tag_id,
        problem_id
        )
        VALUES
        (
        ?, ?
        );
        """,
        (tag_id, problem_id),
    )
