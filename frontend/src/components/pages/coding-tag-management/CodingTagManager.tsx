import { Divider, Stack } from "@mui/material";
import { HashChip } from "../../common/HashChip";
import { SingleAutocomplete } from "../../common/SingleAutocomplete";
import { useGetRecordCodingAttemptData } from "../../../hooks/endpoint/useGetRecordCodingAttemptData";

export function CodingTagManager({
  tag,
  tagProblems,
}: {
  tag: string;
  tagProblems: string[];
}) {
  // Get all problems for the autocomplete options
  const { problems } = useGetRecordCodingAttemptData();

  // Ensure we have exactly 5 slots, padding with empty strings if needed
  const problemSlots = [...tagProblems, "", "", "", "", ""].slice(0, 5);

  return (
    <Stack
      direction="column"
      sx={{ backgroundColor: "background.paper", alignItems: "start", p: 1 }}
    >
      <HashChip value={tag} />
      <Divider sx={{ mb: 2 }} />
      {problemSlots.map((problem, index) => (
        <SingleAutocomplete
          key={`${tag}#${index + 1}`}
          freeSolo={false}
          allOptions={problems}
          formName={`${tag}#${index + 1}`}
          label={`Classic problem ${index + 1}`}
        />
      ))}
    </Stack>
  );
}
