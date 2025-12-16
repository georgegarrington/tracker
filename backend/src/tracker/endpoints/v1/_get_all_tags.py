from tracker.db.fns import get_coding_tag_map

async def get_all_tags() -> list[str]:
    return list(get_coding_tag_map().keys())