// @unocss-ignore
import type { IProps, IPropsIcon } from "../../prop.type";

// #region props
export interface IAModalProps extends IProps, IPropsIcon {
	show?: boolean; // show modal
	panelc?: string; // css classes for message 'span' html element
	closable?: boolean; // if modal is self closable
	closeicon?: string; // icon for close button
	closec?: string; // css classes for close button
}
// #endregion props

// #region emits
export interface IAModalEmits {
	(e: "close"): void; // close event
}
// #endregion emits

// Svelte events interface
export interface IAModalEmitsS {
	close: void; // close event
}
