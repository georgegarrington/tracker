import { useEffect, useMemo, useState } from "react";
import { useTrackerContext } from "../../context";
import type { components } from "../../generated/schema";

export function useGetCodingAttempts() {
  const { client } = useTrackerContext();

  const [response, setResponse] = useState<
    undefined | components["schemas"]["CodingAttempt"][]
  >(undefined);

  useEffect(() => {
    void client.GET("/v1/get-coding-attempts").then((res) => {
      console.log("Fetched record coding attempt data: ", res.data);
      setResponse(res.data);
    });
  }, []);

  const attempts = useMemo(() => {
    if (!response) {
      return [];
    }

    return response;
  }, [response]);

  return { attempts };
}
