import {
  DataGrid,
  type GridCellParams,
  type GridColDef,
} from "@mui/x-data-grid";
import type { Difficulty, NeededHelp } from "../../../../types/common";
import { DifficultyChip } from "../../../common/DifficultyChip";
import { Box } from "@mui/material";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { useGetCodingAttempts } from "../../../../hooks/endpoint/useGetCodingAttempts";
import { NeededHelpChip } from "../../../common/NeededHelpChip";
import { HashChip } from "../../../common/HashChip";

export function CodingAttemptTable() {
  const columns: GridColDef[] = [
    {
      field: "problem_name",
      headerName: "Problem",
      width: 300,
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
      width: 120,
      renderCell: ({ value }: GridCellParams<any, NeededHelp>) =>
        value && <NeededHelpChip neededHelp={value} />,
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
      renderCell: ({ value: tags }: GridCellParams<any, string[]>) =>
        tags?.map((tag, i) => (
          <HashChip sx={{ mr: 0.5 }} key={i} value={tag} />
        )) || <Box />,
    },
  ];

  const { attempts } = useGetCodingAttempts();

  return (
    <DataGrid
      sx={{ width: "100%" }}
      rows={attempts}
      columns={columns}
      initialState={{
        sorting: {
          sortModel: [{ field: "attempt_time", sort: "desc" }],
        }
      }}
      autoHeight
    />
  );
}
