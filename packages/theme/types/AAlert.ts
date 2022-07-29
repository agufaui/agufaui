import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IAAlertProps extends IProps, IPropsComposeX, IPropsIcon {
  show?: boolean; // show alert
  msg?: string; // message
  iconColor?: string; // icon color eg. text-red-4
  iconMargin?: string; // icon margin eg. mt-0.5
  font?: string; // font of component eg. font-medium
  msgClass?: string; // css classes for message element
  closeable?: boolean; // is component closeable
  maxWidth?: string; // max width eg. max-w-md
}
// #endregion props

// #region emits
export interface IAAlertEmits {
  (e: "closea", show: boolean): void; // close alert event
}
// #endregion emits
