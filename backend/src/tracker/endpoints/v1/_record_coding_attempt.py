
from tracker.endpoints.v1.models.requests import RecordCodingAttemptRequest
from tracker.db.fns import get_coding_tag_map, get_coding_problem_map

async def record_coding_attempt(request: RecordCodingAttemptRequest) -> None:
    """
    * Get all existing problems - check if this is a new problem or not. 
    * If it is then create it in the DB
    * Get all existings tags - check if any tags are new then create them
    * Check 
    """

    tag_map, problem_map = get_coding_tag_map(), get_coding_problem_map()

    if not(problem_id := problem_map.get(request.problem)):
        pass

    # if not(tag_id := tag_map.get(request.tags)):
    #     pass

    


    pass