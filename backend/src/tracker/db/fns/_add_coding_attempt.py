from datetime import datetime
from sqlite3 import Connection
from tracker.types import Difficulty, NeededHelp


def add_coding_attempt(
    conn: Connection,
    problem_id: int,
    attempt_time: datetime,
    minutes_taken: int,
    difficulty: Difficulty,
    needed_help: NeededHelp,
    notes: str | None = None,
) -> None:
    conn.execute(
        """
        INSERT INTO coding_attempts
        (
        problem_id,
        attempt_time,
        minutes_taken,
        difficulty,
        needed_help,
        notes
        )
        VALUES
        (
        ?, ?, ?, ?, ?, ?
        );
        """,
        (
            problem_id,
            attempt_time,
            minutes_taken,
            difficulty,
            needed_help,
            notes,
        ),
    )
