// import { getRecordCodingAttemptDataV1GetRecordCodingAttemptDataGet } from "../../../../tracker-client";
import { useMemo } from "react";
import { useGetRecordCodingAttemptData } from "../../../../hooks/endpoint/useGetRecordCodingAttemptData";
import { MultiAutocomplete } from "../../../common/MultiAutocomplete";

export function TagAutocomplete() {
  const { tags } = useGetRecordCodingAttemptData();

  // const tags = useMemo(() => response ? response.tags : [], [response]);

  return (
    <MultiAutocomplete
      allOptions={tags}
      label="Tags"
      placeholder="Type tags here"
    />
  );
}
