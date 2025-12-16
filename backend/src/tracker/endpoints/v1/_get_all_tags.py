from tracker.db.fns import get_all_coding_tags

async def get_all_tags() -> list[str]:
    return list(get_all_coding_tags().keys())