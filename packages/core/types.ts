import type { AButtonProps } from "./button/types";

export const defaultType = "default";

export interface Theme {
  abutton?: Readonly<Record<string, AButtonProps>>;
}
