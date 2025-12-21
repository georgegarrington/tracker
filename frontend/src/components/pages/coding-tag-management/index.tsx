import { Stack, Typography } from "@mui/material";
import { useGetRecordCodingAttemptData } from "../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { CodingTagManager } from "./CodingTagManager";

export default function CodingTagManagement() {
  const { tags, problems } = useGetRecordCodingAttemptData();

  return (
    <Stack sx={{ p: 2 }} gap={2}>
      {tags.map((tag, i) => (
        <CodingTagManager key={i} tag={tag} problems={problems} />
      ))}
    </Stack>
  );
}
