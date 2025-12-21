import { Divider, Stack } from "@mui/material";
import { HashChip } from "../../common/HashChip";
import { SingleAutocomplete } from "../../common/SingleAutocomplete";

export function CodingTagManager({
  tag,
  problems,
}: {
  tag: string;
  problems: string[];
}) {
  return (
    <Stack
      direction="column"
      sx={{ backgroundColor: "background.paper", alignItems: "start", p: 1 }}
    >
      <HashChip value={tag} />
      <Divider sx={{ mb: 2 }} />
      <SingleAutocomplete
        freeSolo={false}
        allOptions={problems}
        formName={`${tag}#1`}
        label="Classic problem 1"
      />
      <SingleAutocomplete
        freeSolo={false}
        allOptions={problems}
        formName={`${tag}#1`}
        label="Classic problem 2"
      />
      <SingleAutocomplete
        freeSolo={false}
        allOptions={problems}
        formName={`${tag}#1`}
        label="Classic problem 3"
      />
      <SingleAutocomplete
        freeSolo={false}
        allOptions={problems}
        formName={`${tag}#1`}
        label="Classic problem 4"
      />
      <SingleAutocomplete
        freeSolo={false}
        allOptions={problems}
        formName={`${tag}#1`}
        label="Classic problem 5"
      />
    </Stack>
  );
}
