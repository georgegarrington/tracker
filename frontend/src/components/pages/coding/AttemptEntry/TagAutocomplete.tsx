// import { getRecordCodingAttemptDataV1GetRecordCodingAttemptDataGet } from "../../../../tracker-client";
import { useMemo } from "react";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { MultiAutocomplete } from "../../../common/MultiAutocomplete";

export function TagAutocomplete({
  tags,
  selectedProblem,
  problemsToTags,
}: {
  tags: string[];
  selectedProblem?: string;
  problemsToTags?: Record<string, string[]>;
}) {
  // const { tags } = useGetRecordCodingAttemptData();

  // const tags = useMemo(() => response ? response.tags : [], [response]);

  const defaultValues = useMemo(() => {
    console.log(
      "problemsToTags:",
      problemsToTags,
      "selectedProblem:",
      selectedProblem,
    );

    const res =
      problemsToTags && selectedProblem
        ? problemsToTags[selectedProblem]
        : undefined;
    console.log("res:", res);
    return res;
  }, [problemsToTags, selectedProblem]);

  return (
    <MultiAutocomplete
      formName="tags"
      allOptions={tags}
      label="Tags"
      placeholder="Type tags here"
      noOptionsText="New tag!"
      defaultValues={defaultValues}
    />
  );
}
