// @unocss-ignore
import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

type TDisplay = "flex" | "inline-flex";

// #region props
export interface IAAlertProps extends IProps, IPropsComposeX, IPropsIcon {
	show?: boolean; // show alert
	display?: TDisplay; // display class for container div html element
	msg?: string; // message.  Not configurable
	mclass?: string; // css classes for message span html element
	closable?: boolean; // is component closable
	clicon?: string; // icon for close button
	clclass?: string; // css classes for close button
}
// #endregion props

// #region emits
export interface IAAlertEmits {
	(e: "closea"): void; // close alert event
}
// #endregion emits
