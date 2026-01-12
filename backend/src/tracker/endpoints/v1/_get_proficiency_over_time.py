from tracker.db.fns import get_proficiency_over_time as db_get_proficiency_over_time
from tracker.db.utils._db_connection import db_connection
from tracker.endpoints.v1.models.responses._proficiency_over_time import (
    ProficiencyOverTime,
    TagDataPoint,
)


async def get_proficiency_over_time() -> ProficiencyOverTime:
    """
    Get running average proficiency per tag over time.
    """

    with db_connection() as conn:
        data_by_tag = db_get_proficiency_over_time(conn)
        return ProficiencyOverTime(
            data_by_tag={
                tag: [
                    TagDataPoint(
                        attempt_time=str(point["attempt_time"]),
                        proficiency=float(point["proficiency"]),
                    )
                    for point in points
                ]
                for tag, points in data_by_tag.items()
            }
        )
