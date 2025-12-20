import {
  DataGrid,
  type GridCellParams,
  type GridColDef,
} from "@mui/x-data-grid";
import type { Difficulty } from "../../../../types/common";
import { DifficultyChip } from "../../../common/DifficultyChip";
import { Box } from "@mui/material";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { useGetCodingAttempts } from "../../../../hooks/endpoint/useGetCodingAttempts";

export function CodingAttemptTable() {
  const columns: GridColDef[] = [
    {
      field: "problem_name",
      headerName: "Problem",
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      renderCell: ({ value }: GridCellParams<any, Difficulty>) =>
        value && <DifficultyChip difficulty={value} />,
    },
    {
      field: "needed_help",
      headerName: "Needed Help",
      width: 130,
    },
    {
      field: "attempt_time",
      headerName: "Attempt Time",
      width: 170,
    },
    {
      field: "minutes_taken",
      headerName: "Time Taken",
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 300,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
    },
  ];

  const {attempts} = useGetCodingAttempts();

  return (
    <DataGrid
      sx={{ width: "100%" }}
      rows={attempts}
      columns={columns}
      autoHeight
    />
  );
}
