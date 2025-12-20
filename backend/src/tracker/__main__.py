from .app import make_service
import uvicorn
from .settings import get_settings


def run() -> None:
    settings = get_settings()

    # asyncio.create_task(background_backup())
    uvicorn.run(
        make_service,
        port=settings.PORT,
    )

    # pass


def main() -> None:
    run()
    # asyncio.run(run())


if __name__ == "__main__":
    main()
