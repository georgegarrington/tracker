from typing import TypeVar, Callable

A = TypeVar("A")


async def run_in_executor(callable: Callable[..., A]) -> A:
    return callable()
