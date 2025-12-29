import { useEffect, useMemo, useState } from "react";
import { useTrackerContext } from "../../context";
import type { components } from "../../generated/schema";

export function useGetClassicsByTag() {
  const { client } = useTrackerContext();

  const [response, setResponse] = useState<
    undefined | components["schemas"]["ClassicsByTag"]
  >(undefined);

  useEffect(() => {
    void client.GET("/v1/get-coding-classics-by-tag").then((res) => {
      console.log("Fetched classics by tag: ", res.data);
      setResponse(res.data);
    });
  }, []);

  const classicsByTag = useMemo(
    () => response?.classics_by_tag ?? {},
    [response],
  );

  return { classicsByTag };
}
