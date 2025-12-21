import { Button, Stack } from "@mui/material";
import { CodingAttemptTable } from "./CodingAttemptGrid";

export default function Coding() {
  return (
    <Stack direction="column" sx={{ p: 1 }} alignItems="flex-start" gap={1}>
      {/* <AttemptEntry
    existingProblems={getExistingProblems()}
    existingTags={getExistingTags()}
    /> */}
      <Button
        href="/coding/new_attempt"
        startIcon={<>+</>}
        variant="contained"
        color="secondary"
      >
        Record attempt
      </Button>
      <CodingAttemptTable />
    </Stack>
  );
}
