import type { IPropsShared, IPropsComposeX } from "../prop.type";

export interface IAAlertErrorProps extends IPropsShared, IPropsComposeX {
  show?: boolean;
  error?: boolean;
  msg?: string;

  //@todo: remove below code, reference core/button/types.ts
  aType?: string;
  aClass?: string;
}

export interface IAAlertErrorEmits {
  (e: "closea", show: boolean): void;
}
