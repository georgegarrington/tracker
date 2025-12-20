import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export function TimeEntry() {
  return (
    <DateTimePicker
      name="time"
      format="yyyy-MM-dd HH:mm"
      ampm={false}
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
