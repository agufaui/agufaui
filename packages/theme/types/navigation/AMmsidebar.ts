import type { IProps } from "../../prop.type";
// #region props
import type { IAMpanelProps } from "./AMpanel";

export interface IAMmsidebarProps extends IProps {
	show?: boolean; // if show sidebar
	overlayc?: string; // css classes for background overlay 'div' html element
	closec?: string; // css classes for close button 'button' html element
	closei?: string; // css close button icon
	closeic?: string; // css classes for close button icon 'span' html element
	sidebarc?: string; // css classes for sidebar container 'div' html element
	mpanel: IAMpanelProps; // menu panel
	mpanelc?: string; // css classes for menu panel contaienr 'nav' html element
}
// #endregion props

// #region emits
export interface IAMmsidebarEmits {
	(e: "close"): void; // close alert event
}
// #endregion emits

// Svelte events interface
export interface IAMmsidebarEmitsS {
	close: void; // click event
}
