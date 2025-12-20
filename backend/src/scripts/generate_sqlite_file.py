import sqlite3
from tracker.settings import get_settings

CREATE_CODING_PROBLEMS_SCHEMA = """

CREATE TABLE coding_problems (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    url TEXT
);

CREATE TABLE coding_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE coding_problem_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (problem_id) REFERENCES coding_problems(id),
    FOREIGN KEY (tag_id) REFERENCES coding_tags(id)
);

CREATE INDEX idx_coding_problem_id ON coding_problem_tags (problem_id);
CREATE INDEX idx_coding_tag_id ON coding_problem_tags (tag_id);

CREATE TABLE coding_attempts (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    attempt_time TIMESTAMP NOT NULL,
    minutes_taken INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ("Easy", "Medium", "Hard")),
    needed_help TEXT NOT NULL CHECK (needed_help IN ("Yes", "No", "Kinda")),
    notes TEXT,
    FOREIGN KEY (problem_id) REFERENCES coding_problems(id)
);

CREATE INDEX idx_coding_attempt_problem_id ON coding_attempts (problem_id);
CREATE INDEX idx_coding_attempt_time ON coding_attempts (attempt_time);

"""

CREATE_SYSDESIGN_SCHEMA = """

CREATE TABLE sysdesign_problems (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    url TEXT
);

CREATE TABLE sysdesign_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE sysdesign_problem_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (problem_id) REFERENCES sysdesign_problems(id),
    FOREIGN KEY (tag_id) REFERENCES sysdesign_tags(id)
);

CREATE INDEX idx_sysdesign_problem_id ON sysdesign_problem_tags (problem_id);
CREATE INDEX idx_sysdesign_tag_id ON sysdesign_problem_tags (tag_id);

CREATE TABLE sysdesign_attempts (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    attempt_time TIMESTAMP NOT NULL,
    minutes_taken INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ("Easy", "Medium", "Hard")),
    needed_help TEXT NOT NULL CHECK (needed_help IN ("Yes", "No", "Kinda")),
    notes TEXT,
    FOREIGN KEY (problem_id) REFERENCES sysdesign_problems(id)
);

CREATE INDEX idx_sysdesign_attempt_problem_id ON sysdesign_attempts (problem_id);
CREATE INDEX idx_sysdesign_attempt_time ON sysdesign_attempts (attempt_time);

"""


def generate_sqlite_schema() -> None:
    settings = get_settings()

    conn = sqlite3.connect(settings.DB_PATH)

    conn.executescript(CREATE_CODING_PROBLEMS_SCHEMA)
    conn.executescript(CREATE_SYSDESIGN_SCHEMA)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    generate_sqlite_schema()
