import { Autocomplete, Stack, TextField } from "@mui/material";
import { CodingProblemAutocomplete } from "./AttemptEntry/CodingProblemAutocomplete";
import { Tag } from "@mui/icons-material";
import { TagAutocomplete } from "./AttemptEntry/TagAutocomplete";
import { AttemptEntry } from "./AttemptEntry";
import { get } from "es-toolkit/compat";

function getExistingProblems(): string[] {
  return [
    "Two Sum",
  ];
  }

function getExistingTags(): string[] {
  return [
    "array",
    "hash table",
    "two pointers",
  ]
}

export default function Coding() {
  return <Stack direction = "column" sx = {{p: 1}}>
    <AttemptEntry
    existingProblems={getExistingProblems()}
    existingTags={getExistingTags()}
    />
  </Stack>
}
