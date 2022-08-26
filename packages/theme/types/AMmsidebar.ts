import type { IProps, IPropsIcon } from "../prop.type";
// #region props
import type { IAMsidebarItem } from "./AMsidebar";

export interface IAMmsidebarProps extends IProps, IPropsIcon {
	show?: boolean; // if show sidebar
	overlayc?: string; // css classes for background overlay 'div' html element
	closec?: string; // css classes for close button 'button' html element
	closei?: string; // css close button icon
	closeic?: string; // css classes for close button icon 'span' html element
	sidebarc?: string; // css classes for sidebar container 'div' html element
	linksc?: string; // css classes for menus and links container 'nav' html element
	items: IAMsidebarItem[]; // menu items
	mdropdownt?: string; // common Amdropdown type for sidebar items
	mpanelt?: string; // common Ampanel type for sidebar items
	linkc?: string; // common css classes for type IAMmsidebarLink 'a' html element
	ic?: string; // common css classes for type IAMmsidebarLink icon 'span' html element
	vc?: string; // common css classes for type IAMmsidebarLink title 'span' html element
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
