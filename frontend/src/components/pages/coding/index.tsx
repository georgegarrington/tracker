import { Button, Stack } from "@mui/material";
import { CodingAttemptTable } from "./CodingAttemptGrid";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Coding() {
  return (
    <Stack direction="column" sx={{ p: 1 }} alignItems="flex-start" gap={1}>
      <Stack direction="row" gap={1}>
        <Button
          href="/coding/new_attempt"
          startIcon={<>+</>}
          variant="contained"
          color="secondary"
        >
          Record attempt
        </Button>
        <Button
          href="/coding/analytics"
          startIcon={<BarChartIcon />}
          variant="outlined"
          color="primary"
        >
          Analytics
        </Button>
      </Stack>
      <CodingAttemptTable />
    </Stack>
  );
}
