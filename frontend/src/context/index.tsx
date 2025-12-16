// import React, { type PropsWithChildren } from "react";
import type { paths } from "../generated/schema";
import createClient from "openapi-fetch";
import React, { type PropsWithChildren } from "react";

const client = createClient<paths>({
  baseUrl: "http://localhost:8791",
});

export type TrackerClient = typeof client;

const INIT_CONTEXT = {
  client,
};

type Context = typeof INIT_CONTEXT;

const Context = React.createContext(INIT_CONTEXT);

export function TrackerContextProvider({ children }: PropsWithChildren<{}>) {
  return <Context.Provider value={INIT_CONTEXT}>{children}</Context.Provider>;
}

export function useTrackerContext() {
  return React.useContext(Context);
}
