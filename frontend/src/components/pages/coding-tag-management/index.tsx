import { Stack } from "@mui/material";
import { useGetClassicsByTag } from "../../../hooks/endpoint/useGetClassicsByTag";
import { useGetRecordCodingAttemptData } from "../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { CodingTagManager } from "./CodingTagManager";

export default function CodingTagManagement() {
  const { tags } = useGetRecordCodingAttemptData();
  const { classicsByTag } = useGetClassicsByTag();

  return (
    <Stack sx={{ p: 2 }} gap={2}>
      {tags.map((tag, i) => (
        <CodingTagManager
          key={i}
          tag={tag}
          tagProblems={classicsByTag[tag] ?? []}
        />
      ))}
    </Stack>
  );
}
