import { DataGrid, type GridCellParams, type GridColDef } from "@mui/x-data-grid";
import type { Difficulty } from "../../../../types/common";
import { DifficultyChip } from "../../../common/DifficultyChip";
import { Box } from "@mui/material";

export function CodingAttemptTable() {

    const columns: GridColDef[] = [
        {
            field: "problem",
            headerName: "Problem"
        },
        {
            field: "difficulty",
            headerName: "Difficulty",
            renderCell: ({value}: GridCellParams<any, Difficulty>) => 
                value && <DifficultyChip difficulty={value} />,
        },
        {
            field: "date",
            headerName: "Attempt Date",
            width: 150
        },
        {
            field: "timeTaken",
            headerName: "Time Taken"
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
        }
    ]

    return <DataGrid
    sx={{width: "100%"}}
    rows={[
        {
            id: 1,
            problem: "Two Sum",
            difficulty: "Easy",
            date: "2024-01-01",
            timeTaken: "15 min",
        }
    ]}
    columns={columns}
    autoHeight
    />
}