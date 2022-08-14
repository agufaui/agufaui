// @unocss-ignore
import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IAAlertProps extends IProps, IPropsComposeX, IPropsIcon {
	show?: boolean; // show alert
	msg?: string; // message.  Not configurable
	cclass?: string; // css classes for container div html element
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
