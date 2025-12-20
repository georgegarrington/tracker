from typing import TypeVar

A = TypeVar("A")
B = TypeVar("B")


def flip_dict(d: dict[A, B]) -> dict[B, A]:
    return {v: k for k, v in d.items()}
