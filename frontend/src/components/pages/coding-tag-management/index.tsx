import { useMemo } from "react";
import { orderBy } from "es-toolkit";
import { Stack } from "@mui/material";
import { useGetClassicsByTag } from "../../../hooks/endpoint/useGetClassicsByTag";
import { useGetRecordCodingAttemptData } from "../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { CodingTagManager } from "./CodingTagManager";

export default function CodingTagManagement() {
  const { tags, problems, problemsToTags } = useGetRecordCodingAttemptData();
  const { classicsByTag } = useGetClassicsByTag();

  const sortedTags = useMemo(
    () => orderBy(tags, [(tag) => classicsByTag[tag]?.length ?? 0], ["desc"]),
    [tags, classicsByTag],
  );

  return (
    <Stack sx={{ p: 2 }} gap={2}>
      {sortedTags.map((tag, i) => (
        <CodingTagManager
          key={i}
          tag={tag}
          tagProblems={classicsByTag[tag] ?? []}
          problems={problems}
          problemsToTags={problemsToTags}
        />
      ))}
    </Stack>
  );
}
