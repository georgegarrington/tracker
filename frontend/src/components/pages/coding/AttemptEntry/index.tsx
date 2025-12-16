import { Button, Stack, TextField } from "@mui/material";
import { CodingProblemAutocomplete } from "./CodingProblemAutocomplete";
import { TagAutocomplete } from "./TagAutocomplete";
import { DifficultyEntry } from "./DifficultyEntry";
import { TypedSelect } from "../../../common/TypedSelect";
import { DateEntry } from "./DateEntry";
import { DurationEntry } from "../../../common/DurationEntry";

export function AttemptEntry() {
  return (
    <Stack
      direction="column"
      component="form"
      gap={1}
      sx={{ width: "100%", p: 1 }}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Form data submitted:", data);
      }}
    >
      <CodingProblemAutocomplete />
      <TextField label="URL" name="url" />
      <Stack direction="row" gap={1}>
        {/* Additional form fields can be added here */}
        <DateEntry />
        <DurationEntry label="Time taken" />
        <DifficultyEntry />
        <TypedSelect label="Needed help?" options={["Yes", "No", "Kinda"]} />
      </Stack>
      <TagAutocomplete />
      <TextField name="notes" label="Notes" minRows={16} multiline />
      <Button variant="contained" sx={{ alignSelf: "center" }} type="submit">
        Record attempt
      </Button>
    </Stack>
  );
}
