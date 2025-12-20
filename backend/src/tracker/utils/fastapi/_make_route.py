from typing import Callable, Literal, Any, get_type_hints
from fastapi.routing import APIRoute


def make_route(
    path: str,
    method: Literal["GET", "POST"],
    endpoint: Callable[..., Any],
) -> APIRoute:
    return APIRoute(
        path=path,
        methods=[method],
        endpoint=endpoint,
        response_model=get_type_hints(endpoint).get("return"),
    )
