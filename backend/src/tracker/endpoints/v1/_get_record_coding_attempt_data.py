from tracker.db.fns import get_coding_tag_map, get_coding_problem_map
from tracker.endpoints.v1.models.responses._record_coding_attempt_data import RecordCodingAttemptData

async def get_record_coding_attempt_data() -> RecordCodingAttemptData:
    """
    Get the list of existing tags, and list of existing problems
    """
    
    return RecordCodingAttemptData(
        tags = list(get_coding_tag_map().keys()),
        problems=list(get_coding_problem_map().keys()),
    )

__all__ = [
    "get_record_coding_attempt_data",]