import { Chip, type ChipProps } from "@mui/material";

function getColour(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function HashChip({ value, ...props }: { value: string } & ChipProps) {
  return (
    <Chip
      {...props}
      label={value}
      sx={{
        ...props.sx,
        bgcolor: getColour(value),
        borderRadius: 3,
        border: "2px solid",
        borderColor: "grey.300",
        color: "black",
      }}
      size="small"
    />
  );
}

const PALETTE = [
  "#FFEBEE",
  "#FFCDD2",
  "#EF9A9A",
  "#FFC1C1",
  "#FFDDE6",
  "#FFE0F0",
  "#F3E5F5",
  "#E1BEE7",
  "#D1C4E9",
  "#C5CAE9",
  "#BBDEFB",
  "#B3E5FC",
  "#B2EBF2",
  "#B2DFDB",
  "#C8E6C9",
  "#DCEDC8",
  "#F0F4C3",
  "#FFF9C4",
  "#FFF3E0",
  "#FFE0B2",
  "#FFCCBC",
  "#D7CCC8",
  "#CFD8DC",
  "#F8BBD0",
  "#FFD7E9",
  "#FFE7F3",
  "#EDE7F6",
  "#E8EAF6",
  "#E3F2FD",
  "#E1F5FE",
  "#E0F7FA",
  "#E0F2F1",
  "#E8F5E9",
  "#F1F8E9",
  "#FFFDE7",
  "#FFF8E1",
  "#FFF3E0",
  "#FFF5E6",
  "#FAF0E6",
  "#F5E6F7",
  "#FBE9E7",
  "#FCE4EC",
  "#F3E2E4",
  "#EAEFF3",
  "#E4F1EA",
  "#E6F7FF",
  "#F3FBFF",
  "#FDF2E9",
];
