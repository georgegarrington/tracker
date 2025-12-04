
from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.responses import JSONResponse

async def test_route():
    return JSONResponse({'key': 'val'})

def make_service() -> FastAPI:

    return FastAPI(
        routes = [
            APIRoute(
                path = "/v1/test",
                methods = ["GET"],
                endpoint = test_route
            )
        ]
    )

    pass