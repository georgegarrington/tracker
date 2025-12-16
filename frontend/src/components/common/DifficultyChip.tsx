import { Chip } from "@mui/material";
import type { ApplicationStatus } from "../../types/ApplicationStatus";
import { useMemo } from "react";
import type { Difficulty } from "../../types/common";

export function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  const [colour, text]: [
    (
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning"
    ),
    string,
  ] = useMemo(() => {
    switch (difficulty) {
      case "Easy":
        return ["success", "Easy"];
      case "Medium":
        return ["warning", "Medium"];
      case "Hard":
        return ["error", "Hard"];
    }
  }, [difficulty]);

  return <Chip label={text} color={colour} size="small" />;
}
