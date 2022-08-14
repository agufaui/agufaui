import type { IProps, IPropsComposeX } from "../prop.type";

// #region props
export interface IAAlertErrorProps extends IProps, IPropsComposeX {
	show?: boolean; // show alert error
	error?: boolean; // if error occurred
	msg?: string; // message.  Not configurable
	errorAAlertType?: string; // Child component AAlert type for error message
	successAAlertType?: string; // Child component AAlert type for success message
}
// #endregion props

// #region emits
export interface IAAlertErrorEmits {
	(e: "closea"): void; // close alert error component
}
// #endregion emits
