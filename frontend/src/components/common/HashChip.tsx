import { Chip, type ChipProps } from "@mui/material";
import { getTagColour } from "../../utils/getTagColour";

export function HashChip({ value, ...props }: { value: string } & ChipProps) {
  return (
    <Chip
      {...props}
      label={value}
      sx={{
        ...props.sx,
        bgcolor: getTagColour(value),
        borderRadius: 3,
        border: "2px solid",
        borderColor: "grey.300",
        color: "black",
      }}
      size="small"
    />
  );
}
