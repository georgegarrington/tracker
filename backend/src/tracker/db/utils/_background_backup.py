from tracker.settings import get_settings
import datetime
import sqlite3
import tempfile
import asyncio

SLEEP_SECONDS = 60


def dump_sql_file(sqlite_path: str, dest_sql_path: str) -> None:
    with open(dest_sql_path, "w") as handle, sqlite3.connect(sqlite_path) as conn:
        handle.writelines(conn.iterdump())

def create_temp_sqlite_copy(source_path: str, dest_path: str) -> None:
    with (
        sqlite3.connect(source_path) as source,
        sqlite3.connect(dest_path) as dest,
    ):
        source.backup(dest)


async def background_backup() -> None:
    settings = get_settings()

    while True:
        try:
            start = datetime.datetime.now()
            with (
                tempfile.NamedTemporaryFile(mode="w") as sqlite_bkup,
            ):
                await asyncio.to_thread(
                    lambda: create_temp_sqlite_copy(
                        source_path=settings.DB_PATH, dest_path=sqlite_bkup.name
                    )
                )
                # await asyncio.to_thread(lambda: source.backup(dest))
                await asyncio.to_thread(
                    lambda: dump_sql_file(sqlite_bkup.name, settings.SQL_BACKUP)
                )

            end = datetime.datetime.now()
            print(f"({end}) Background backed up in: ", end - start)
            await asyncio.sleep(SLEEP_SECONDS)

        except Exception as err:
            print("BACKUP ERR!", err)
