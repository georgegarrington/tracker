import { Chip } from "@mui/material";

export function TagChip({ tag }: { tag: string }) {
    return <Chip label={tag} size="small" />;
}