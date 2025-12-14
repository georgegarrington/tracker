import type { JSX } from "react";

export type PageSpec = {
  content: JSX.Element;
  path: string;
} & (
  {  
  label: string;} | {noDrawer: true}
)
