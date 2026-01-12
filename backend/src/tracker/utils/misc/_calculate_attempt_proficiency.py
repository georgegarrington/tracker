from tracker.types import Difficulty, NeededHelp


def calculate_attempt_proficiency(
    difficulty: Difficulty, needed_help: NeededHelp
) -> float:
    proficiency = 0.0

    match difficulty:
        case "Easy":
            proficiency += 0.5
        case "Medium":
            proficiency += 0.25
        case "Hard":
            pass

    match needed_help:
        case "No":
            proficiency += 0.5
        case "Some":
            proficiency += 0.25
        case "Yes":
            pass

    return proficiency
