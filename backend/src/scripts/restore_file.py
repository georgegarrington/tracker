import sqlite3

SQL_BACKUP_PATH = "/Users/georgegarrington/source/tracker/backup/bkup.sql"
DEST_SQLITE_PATH = "/Users/georgegarrington/Documents/trackerdb_restored"


def restore_file() -> None:
    with open(SQL_BACKUP_PATH, "r") as f:
        sql = f.read()

    with sqlite3.connect(DEST_SQLITE_PATH) as conn:
        cursor = conn.cursor()
        cursor.executescript(sql)
        conn.commit()


if __name__ == "__main__":
    restore_file()
