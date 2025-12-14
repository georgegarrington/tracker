import { Box, Button, Stack } from "@mui/material";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { ApplicationStatusChip } from "../../common/ApplicationStatusChip";
import { ApplicationStatusVariants, type ApplicationStatus } from "../../../types/ApplicationStatus";

function getRoles() {

  const roles = [
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
    {
      id: 5,
      recruiter: "Sasha Duquesne",
      firm: "Sona Asset Management",
      status: "unstarted",
      nextEvent: "No upcoming events",
    },
    {
      id: 6,
      recruiter: "Sasha Duquesne",
      firm: "Symmetry Investments",
      status: "unstarted",
      nextEvent: "No upcoming events",
    },
    {
      id: 7,
      recruiter: "Kunaal",
      firm: "Xantium",
      status: "unstarted",
      nextEvent: "No upcoming events",
    },
    {
      id: 8,
      recruiter: "Claire Walklate",
      firm: "Jane Street",
      status: "unstarted",
      nextEvent: "No upcoming events",
      notes: "Recruiter who works at the firm! Only contact via Whatsapp",
    },
    {
      id: 9,
      recruiter: "John Willhelm",
      firm: "Jump Trading",
      status: "unstarted",
      nextEvent: "No upcoming events",
      notes: "Meet him for a pint",
    },
    {
      id: 10,
      recruiter: "Emma Claxton",
      firm: "QRT",
      status: "unstarted",
      nextEvent: "No upcoming events",
    },
    {
      id: 11,
      recruiter: "Alex Darch",
      firm: "G-Research",
      status: "unstarted",
      nextEvent: "No upcoming events",
    },
    {
      id: 12,
      recruiter: "Tim Kendrick",
      firm: "Marshall Wace",
      status: "unstarted",
      nextEvent: "No upcoming events",
      notes: "Ask if he can refer me",
    },
    {
      id: 13,
      recruiter: "Tim Kendrick",
      firm: "Nanook Energy",
      status: "unstarted",
      nextEvent: "No upcoming events",
      notes: "Ask if he can refer me",
    }
  ];

  return roles;

}

export default function Roles() {
  const cols: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "recruiter", headerName: "Recruiter", width: 130 },
    { field: "firm", headerName: "Firm", width: 200 },
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
    {field: "notes", headerName: "Notes", width: 400 },
    // { field: "description", headerName: "Description", width: 200 },
  ];

  const rows = getRoles();

  return (
    <Stack sx={{ p: 1 }} direction="column" gap={1} alignItems={"flex-start"}>
      <Button 
      startIcon={<>+</>}
      variant="contained" 
      color="secondary">
        Add role
        </Button>
      <DataGrid columns={cols} rows={rows} sx={{width: "100%"}}/>
    </Stack>
  );
}
