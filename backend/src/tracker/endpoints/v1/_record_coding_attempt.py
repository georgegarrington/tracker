
from tracker.endpoints.v1.models.requests import RecordCodingAttemptRequest


async def record_coding_attempt(request: RecordCodingAttemptRequest) -> None:
    """
    * Get all existing problems - check if this is a new problem or not. 
    * If it is then create it in the DB
    * Get all existings tags - check if any tags are new then create them
    * Check 
    """

    print(f"REQUEST: {request}")


    pass