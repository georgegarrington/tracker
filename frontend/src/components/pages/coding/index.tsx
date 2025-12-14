import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { CodingProblemAutocomplete } from "./AttemptEntry/CodingProblemAutocomplete";
import { Tag } from "@mui/icons-material";
import { TagAutocomplete } from "./AttemptEntry/TagAutocomplete";
import { AttemptEntry } from "./AttemptEntry";
import { get } from "es-toolkit/compat";
import { CodingAttemptTable } from "./CodingAttemptGrid";

function getExistingProblems(): string[] {
  return [
    "Two Sum",
  ];
  }

function getExistingTags(): string[] {
  return [
    "linked list",
    "sliding window",
    "binary search",
    "tree",
    "stack",
    "graph",
    "dynamic programming",
    "greedy",
    "hash table",
    "depth-first search",
    "breadth-first search",
    "recursion",
  ]
}

export default function Coding() {
  return <Stack direction = "column" sx = {{p: 1}}>
    {/* <AttemptEntry
    existingProblems={getExistingProblems()}
    existingTags={getExistingTags()}
    /> */}
    <CodingAttemptTable/>
  </Stack>
}
