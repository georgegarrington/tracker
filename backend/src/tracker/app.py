
from fastapi import FastAPI
from fastapi.routing import APIRoute
from pydantic import BaseModel

from tracker.utils.fastapi._make_route import make_route

class Person(BaseModel):
    name: str
    age: int


async def test_route() -> Person:
    return Person(
        name="George",
        age=28,
    )


def make_service() -> FastAPI:
    return FastAPI(
        routes=[
            make_route(
                path="/v1/test",
                method="GET",
                endpoint=test_route,
            )
        ]
    )
