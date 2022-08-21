import type { IProps } from "../prop.type";

// #region props
export interface IAMobileProps extends IProps {
	open?: boolean; // open/close state of menu
	i?: string; // menu icon
	ic?: string; // css classes for icon element
	closeicon?: string; // icon for close button
	closec?: string; // css classes for close button element
}
// #endregion props

// #region emits
export interface IAMobileEmits {
	(e: "click", event: MouseEvent): void; // click event
}
// #endregion emits

// Svelte events interface
export interface IAMobileEmitsS {
	click: MouseEvent; // click event
}
