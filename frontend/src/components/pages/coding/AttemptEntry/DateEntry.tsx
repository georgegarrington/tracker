import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function DateEntry() {
  return (
    <DatePicker
      format="yyyy-MM-dd"
      disableFuture
      slotProps={{
        textField: {
          fullWidth: true,
        },
      }}
    />
  );
}
