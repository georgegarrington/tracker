import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tracker.db.utils._background_backup import background_backup
from tracker.utils.fastapi._make_route import make_route
from tracker.endpoints.v1 import (
    get_record_coding_attempt_data,
    record_coding_attempt,
    get_problems_by_tag,
    update_coding_tag_classics,
    get_coding_classics_by_tag,
    get_latest_coding_attempts,
)


class Person(BaseModel):
    name: str
    age: int


async def test_route(req: Request) -> Person:
    return Person(
        name="George",
        age=28,
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(background_backup())
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task cancelled successfully")


def make_service() -> FastAPI:
    app = FastAPI(
        lifespan=lifespan,
        routes=[
            make_route(
                path="/v1/test",
                method="GET",
                endpoint=test_route,
            ),
            make_route(
                path="/v1/get-record-coding-attempt-data",
                method="GET",
                endpoint=get_record_coding_attempt_data,
            ),
            make_route(
                path="/v1/record-coding-attempt",
                method="POST",
                endpoint=record_coding_attempt,
            ),
            make_route(
                path="/v1/get-latest-coding-attempts",
                method="GET",
                endpoint=get_latest_coding_attempts,
            ),
            make_route(
                path="/v1/get-problems-by-tag",
                method="GET",
                endpoint=get_problems_by_tag,
            ),
            make_route(
                path="/v1/update-coding-tag-classics",
                method="POST",
                endpoint=update_coding_tag_classics,
            ),
            make_route(
                path="/v1/get-coding-classics-by-tag",
                method="GET",
                endpoint=get_coding_classics_by_tag,
            ),
        ],
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
