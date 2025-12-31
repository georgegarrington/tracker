import { Button, Stack, TextField } from "@mui/material";
import { CodingProblemAutocomplete } from "./CodingProblemAutocomplete";
import { TagAutocomplete } from "./TagAutocomplete";
import { DifficultyEntry } from "./DifficultyEntry";
import { TypedSelect } from "../../../common/TypedSelect";
import { TimeEntry } from "./TimeEntry";
import { DurationEntry } from "../../../common/DurationEntry";
import { recordCodingAttempt } from "./helpers/recordCodingAttempt";
import { useTrackerContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { useState } from "react";

export function AttemptEntry() {
  const { client } = useTrackerContext();
  const navigate = useNavigate();
  const { tags, problems, problemsToTags } = useGetRecordCodingAttemptData();
  const [codingProblem, setCodingProblem] = useState("");

  return (
    <Stack
      direction="column"
      component="form"
      gap={1}
      sx={{ width: "100%", p: 1 }}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Form data submitted:", data);
        try {
          await recordCodingAttempt(client, data as any);
          navigate("/coding");
        } catch (error) {
          console.error("Failed to record coding attempt:", error);
        }
      }}
    >
      <CodingProblemAutocomplete
        problems={problems}
        setCodingProblem={setCodingProblem}
      />
      <TextField label="URL" name="url" />
      <Stack direction="row" gap={1}>
        {/* Additional form fields can be added here */}
        <TimeEntry />
        <DurationEntry label="Time taken" />
        <DifficultyEntry />
        <TypedSelect
          name="neededHelp"
          label="Needed help?"
          options={["Yes", "No", "Kinda"]}
        />
      </Stack>
      <TagAutocomplete
        tags={tags}
        selectedProblem={codingProblem}
        problemsToTags={problemsToTags}
        required
      />
      <TextField name="notes" label="Notes" minRows={16} multiline />
      <Button variant="contained" sx={{ alignSelf: "center" }} type="submit">
        Record attempt
      </Button>
    </Stack>
  );
}
