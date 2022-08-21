// @unocss-ignore
import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

type TDisplay = "flex" | "inline-flex";

// #region props
export interface IAAlertProps extends IProps, IPropsComposeX, IPropsIcon {
	show?: boolean; // show alert
	display?: TDisplay; // display class for container div html element
	v?: string; // message.  Not configurable
	vc?: string; // css classes for message 'span' html element
	closable?: boolean; // is component closable
	closeicon?: string; // icon for close button
	closec?: string; // css classes for close button
}
// #endregion props

// #region emits
export interface IAAlertEmits {
	(e: "close"): void; // close alert event
}
// #endregion emits

// Svelte events interface
export interface IAAlertEmitsS {
	close: void; // click event
}
