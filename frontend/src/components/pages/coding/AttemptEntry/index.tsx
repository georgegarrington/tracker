import { Button, Stack, TextField } from "@mui/material";
import { CodingProblemAutocomplete } from "./CodingProblemAutocomplete";
import { TagAutocomplete } from "./TagAutocomplete";
import { DifficultyEntry } from "./DifficultyEntry";
import { TypedSelect } from "../../../common/TypedSelect";
import { DateEntry } from "./DateEntry";
import { DurationEntry } from "../../../common/DurationEntry";

export function AttemptEntry(
    {
        existingProblems,
        existingTags
    }: {
        existingProblems: string[],
        existingTags: string[],
    }
) {
    return <Stack 
    direction="column" 
    component="form" 
    gap={1} 
    sx={{width: "100%", p: 1}}
    >
      <CodingProblemAutocomplete existingProblems={existingProblems}/>
      <Stack direction="row" gap={1}>
        {/* Additional form fields can be added here */}
        <DateEntry/>
        <DurationEntry label="Time taken"/>
        <DifficultyEntry/>
        <TypedSelect label="Needed help?" options={["Yes", "No", "Kinda"]}/>
    
      </Stack>
      <TagAutocomplete existingTags={existingTags}/>
      <TextField label="Notes" minRows={16} multiline/>
      <Button href = "/coding"variant="contained" sx={{alignSelf: "center"}}>Record attempt</Button>
    </Stack>
}