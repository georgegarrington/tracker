import type { JSX } from "react";

export interface PageSpec {
  content: JSX.Element;
  path: string;
  label: string;
}
