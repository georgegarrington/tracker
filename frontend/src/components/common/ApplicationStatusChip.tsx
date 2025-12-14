import { Chip } from "@mui/material";
import type { ApplicationStatus } from "../../types/ApplicationStatus";
import { useMemo } from "react";

export function ApplicationStatusChip({
  applicationStatus,
}: {
  applicationStatus: ApplicationStatus;
}) {
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
    switch (applicationStatus) {
      case "rejected":
        return ["error", "Rejected"];
      case "pendingMe":
        return ["warning", "Pending My Action"];
      case "pendingThem":
        return ["info", "Pending Their Action"];
      case "unstarted":
        return ["default", "Unstarted"];
      case "offer":
        return ["success", "Offer Received"];
    }
  }, [applicationStatus]);

  return <Chip label={text} color={colour} size="small" />;
}
