import { Box, Select, type SelectProps } from "@mui/material";
import { TypedSelect } from "../../../common/TypedSelect";
import { DifficultyVariants, type Difficulty } from "../../../../types/common";

export function DifficultyEntry(props: SelectProps<Difficulty>) {
  return (
    <TypedSelect
      {...props}
      label="Difficulty"
      options={[...DifficultyVariants]}
    />
  );
}
