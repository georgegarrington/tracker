from tracker.db.fns import (
    get_coding_tag_map,
    get_coding_problem_map,
    get_problem_ids_to_tag_ids,
)
from tracker.db.utils._db_connection import db_connection
from tracker.endpoints.v1.models.responses._record_coding_attempt_data import (
    RecordCodingAttemptData,
)
from tracker.utils.misc._flip_dict import flip_dict


def resolve_tags(tag_ids: list[int], tag_ids_to_tags_map: dict[int, str]) -> list[str]:
    return [
        tag_ids_to_tags_map[tag_id]
        for tag_id in tag_ids
        if tag_id in tag_ids_to_tags_map
    ]


async def get_record_coding_attempt_data() -> RecordCodingAttemptData:
    """
    Get the list of existing tags, and list of existing problems
    """

    with db_connection() as conn:
        tags_to_tag_ids = get_coding_tag_map(conn)
        tag_ids_to_tags = flip_dict(tags_to_tag_ids)
        problems_to_problem_ids = get_coding_problem_map(conn)
        problem_ids_to_problems = flip_dict(problems_to_problem_ids)

        problems_ids_to_tag_ids = get_problem_ids_to_tag_ids(conn)

        problems_to_tags = {
            problem_ids_to_problems[pid]: resolve_tags(tag_ids, tag_ids_to_tags)
            for pid, tag_ids in problems_ids_to_tag_ids.items()
        }

        return RecordCodingAttemptData(
            all_tags=list(tags_to_tag_ids.keys()),
            all_problems=list(problems_to_problem_ids.keys()),
            problems_to_tags=problems_to_tags,
        )


__all__ = [
    "get_record_coding_attempt_data",
]
