import type { ThemeShared, ThemeComposeX } from "../typesShared";

export interface AAlertErrorProps extends ThemeShared, ThemeComposeX {
  show?: boolean;
  error?: boolean;
  msg?: string;

  //@todo: remove below code, reference core/button/types.ts
  aType?: string;
  aClass?: string;
}

export interface AAlertErrorEmits {
  (e: "closea", show: boolean): void;
}
