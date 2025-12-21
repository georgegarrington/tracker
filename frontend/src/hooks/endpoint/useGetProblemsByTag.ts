import { useEffect, useState } from "react";
import { useTrackerContext } from "../../context";

export function useGetProblemsByTag() {
  const { client } = useTrackerContext();

  const [problemsByTag, setProblemsByTag] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    void client.GET("/v1/get-problems-by-tag").then((res) => {
      console.log("Fetched problems by tag: ", res.data);
      if (res.data?.problems_by_tag) {
        setProblemsByTag(res.data.problems_by_tag);
      }
    });
  }, [client]);

  return { problemsByTag };
}
