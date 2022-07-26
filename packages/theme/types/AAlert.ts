import type { IPropsShared, IPropsComposeX, IPropsIcon } from "../prop.type";

export interface IAAlertProps extends IPropsShared, IPropsComposeX, IPropsIcon {
  show?: boolean;
  msg?: string;
  iconColor?: string;
  iconMargin?: string;
  color?: string;
  size?: string;
  font?: string;
  msgClass?: string;
  closeable?: boolean;
  autoClose?: boolean;
  autoCloseDelaySeconds?: number;
  autoCloseAnime?: string;
  maxWidth?: string;

  //@todo: remove below code, reference core/button/types.ts
  aType?: string;
  aClass?: string;
  spaceX?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconClass?: string;
}

export interface IAAlertEmits {
  (e: "closea", show: boolean): void;
}
