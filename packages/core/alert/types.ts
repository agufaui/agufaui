import type { ThemeShared, ThemeComposeX, ThemeIcon } from "../typesShared";

export interface AAlertProps extends ThemeShared, ThemeComposeX, ThemeIcon {
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

export interface AAlertEmits {
  (e: "closea", show: boolean): void;
}
