from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tracker.utils.fastapi._make_route import make_route
from tracker.endpoints.v1 import get_record_coding_attempt_data, record_coding_attempt


class Person(BaseModel):
    name: str
    age: int


async def test_route(req: Request) -> Person:
    return Person(
        name="George",
        age=28,
    )


def make_service() -> FastAPI:
    app = FastAPI(
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
