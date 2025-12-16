import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";

export function TypedSelect<T extends string>({
  // label,
  options,
  ...props
}: {
  // label: string,
  options: T[];
} & SelectProps<T>) {
  return (
    <FormControl fullWidth>
      <InputLabel id={props.label as string}>{props.label}</InputLabel>
      <Select {...props}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
