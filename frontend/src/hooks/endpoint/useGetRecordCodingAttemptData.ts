import { useEffect, useMemo, useState } from "react";
import { useTrackerContext } from "../../context";
import type { components } from "../../generated/schema";

export function useGetRecordCodingAttemptData() {
  const { client } = useTrackerContext();

  const [response, setResponse] = useState<
    undefined | components["schemas"]["RecordCodingAttemptData"]
  >(undefined);

  useEffect(() => {
    void client.GET("/v1/get-record-coding-attempt-data").then((res) => {
      console.log("Fetched record coding attempt data: ", res.data);
      setResponse(res.data);
    });
  }, []);

  const [tags, problems, problemsToTags]: [
    string[],
    string[],
    Record<string, string[]>,
  ] = useMemo(() => {
    if (!response) {
      return [[], [], {}];
    }

    return [
      response.all_tags,
      response.all_problems,
      response.problems_to_tags,
    ];
  }, [response]);

  return { tags, problems, problemsToTags };
}
