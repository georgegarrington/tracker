from sqlite3 import Connection


def add_coding_tag_link(
    conn: Connection,
    problem_id: int,
    tag_id: int,
) -> None:
    conn.execute(
        """
        INSERT INTO coding_problem_tags
        (
        problem_id,
        tag_id
        )
        VALUES
        (
        ?, ?
        );
        """,
        (problem_id, tag_id),
    )
