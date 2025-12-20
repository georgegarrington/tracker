import { Chip } from "@mui/material";
import { useMemo } from "react";
import type { NeededHelp } from "../../types/common";

export function NeededHelpChip({ neededHelp }: { neededHelp: NeededHelp }) {
  const colour:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" = useMemo(() => {
    switch (neededHelp) {
      case "Yes":
        return "error";
      case "Kinda":
        return "warning";
      case "No":
        return "success";
    }
  }, [neededHelp]);

  return <Chip label={neededHelp} color={colour} size="small" />;
}
