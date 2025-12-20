from typing import TypeVar, Callable

A = TypeVar("A", str, int)


def parse_group_concat(
    value: str,
    mapper: Callable[[str], A] = lambda x: x,  # type: ignore[return-value,assignment]
) -> list[A]:
    if not value:
        return []

    return [mapper(x.strip()) for x in value.split(",")]
