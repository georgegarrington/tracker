import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function DateEntry() {
  return (
    <DatePicker
      name="date"
      format="yyyy-MM-dd"
      defaultValue={new Date()}
      disableFuture
      slotProps={{
        textField: {
          fullWidth: true,
        },
      }}
    />
  );
}
