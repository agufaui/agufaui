import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IAAlertProps extends IProps, IPropsComposeX, IPropsIcon {
  show?: boolean; // show alert
  msg?: string; // message
  mclass?: string; // css classes for message element
  closeable?: boolean; // is component closeable
}
// #endregion props

// #region emits
export interface IAAlertEmits {
  (e: "closea", show: boolean): void; // close alert event
}
// #endregion emits
