import { Chip } from "@mui/material";
import type { ApplicationStatus } from "../../types/ApplicationStatus";
import { useMemo } from "react";
import type { Difficulty } from "../../types/common";

export function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  const colour:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" = useMemo(() => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
    }
  }, [difficulty]);

  return <Chip label={difficulty} color={colour} size="small" />;
}
