import type { IProps } from "../../prop.type";

// #region props
export interface IAMtoggleProps extends IProps {
	open: boolean; // open/close state of menu
	v?: string; // menu text, not configurable
	vc?: string; // css classes for menu text 'span' html element
	i?: string; // menu icon
	ic?: string; // css classes for icon element
	closeicon?: string; // icon for close button
	closec?: string; // css classes for close button element
}
// #endregion props

// #region emits
export interface IAMtoggleEmits {
	(e: "click", event: MouseEvent): void; // click event
}
// #endregion emits

// Svelte events interface
export interface IAMtoggleEmitsS {
	click: MouseEvent; // click event
}
