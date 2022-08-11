import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IAAlertProps extends IProps, IPropsComposeX, IPropsIcon {
	show?: boolean; // show alert
	msg?: string; // message
	mclass?: string; // css classes for message element
	closable?: boolean; // is component closable
}
// #endregion props

// #region emits
export interface IAAlertEmits {
	(e: "closea"): void; // close alert event
}
// #endregion emits
