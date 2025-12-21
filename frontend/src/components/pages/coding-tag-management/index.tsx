import { Stack } from "@mui/material";
import { useGetProblemsByTag } from "../../../hooks/endpoint/useGetProblemsByTag";
import { CodingTagManager } from "./CodingTagManager";

export default function CodingTagManagement() {
  const { problemsByTag } = useGetProblemsByTag();

  return (
    <Stack sx={{ p: 2 }} gap={2}>
      {Object.entries(problemsByTag).map(([tag, problems], i) => (
        <CodingTagManager key={i} tag={tag} tagProblems={problems} />
      ))}
    </Stack>
  );
}
