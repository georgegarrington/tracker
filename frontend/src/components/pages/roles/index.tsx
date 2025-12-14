import { Box, Button, Stack } from "@mui/material";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { ApplicationStatusChip } from "../../common/ApplicationStatusChip";
import { ApplicationStatusVariants, type ApplicationStatus } from "../../../types/ApplicationStatus";

export default function Roles() {
  const cols: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "recruiter", headerName: "Recruiter", width: 130 },
    { field: "firm", headerName: "Firm", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      type: "singleSelect",
      valueOptions:[...ApplicationStatusVariants],
      renderCell: (params: GridCellParams<any, ApplicationStatus>) =>
        params.value && (
          <ApplicationStatusChip applicationStatus={params.value} />
        ),
    },
    { field: "nextEvent", headerName: "Next Event", width: 200 },
    // { field: "description", headerName: "Description", width: 200 },
  ];

  const rows = [
    { id: 1, recruiter: "Alex Goodall", firm: "GSA", status: "unstarted",
      nextEvent: "No upcoming events",

     },
    {
      id: 2,
      recruiter: "Alex Goodall",
      firm: "Citadel (NXT)",
      status: "unstarted",
      nextEvent: "No upcoming events",

    },
    {
      id: 3,
      recruiter: "Alex Goodall",
      firm: "Wintermute",
      status: "unstarted",
      nextEvent: "No upcoming events",

    },
    {
      id: 4,
      recruiter: "Alex Goodall",
      firm: "Millenium",
      status: "unstarted",
      nextEvent: "No upcoming events",

    },
  ];

  return (
    <Stack sx={{ p: 1 }} direction="column" gap={1} alignItems={"flex-start"}>
      <Button 
      startIcon={<>+</>}
      variant="contained" 
      color="secondary">
        Add role
        </Button>
      <DataGrid columns={cols} rows={rows} />
    </Stack>
  );
}
