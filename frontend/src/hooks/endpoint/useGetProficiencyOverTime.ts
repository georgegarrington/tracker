import { useEffect, useMemo, useState } from "react";
import { useTrackerContext } from "../../context";
import type { components } from "../../generated/schema";

export function useGetProficiencyOverTime() {
  const { client } = useTrackerContext();

  const [response, setResponse] = useState<
    undefined | components["schemas"]["ProficiencyOverTime"]
  >(undefined);

  useEffect(() => {
    void client.GET("/v1/get-proficiency-over-time").then((res) => {
      console.log("Fetched proficiency over time: ", res.data);
      setResponse(res.data);
    });
  }, []);

  const dataByTag = useMemo(() => {
    if (!response) {
      return {};
    }
    return response.data_by_tag;
  }, [response]);

  return { dataByTag };
}
