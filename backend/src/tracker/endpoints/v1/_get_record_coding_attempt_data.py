from tracker.db.fns import get_all_coding_tags, get_all_coding_problems
from tracker.endpoints.v1.models.responses._record_coding_attempt_data import RecordCodingAttemptData

async def get_record_coding_attempt_data() -> RecordCodingAttemptData:
    """
    Get the list of existing tags, and list of existing problems
    """
    
    return RecordCodingAttemptData(
        tags = list(get_all_coding_tags().keys()),
        problems=get_all_coding_problems(),
    )

__all__ = [
    "get_record_coding_attempt_data",]