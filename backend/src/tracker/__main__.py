from .app import make_service
import uvicorn
from .settings import get_settings


def main() -> None:
    settings = get_settings()

    uvicorn.run(
        make_service,
        port=settings.PORT,
    )


if __name__ == "__main__":
    main()
