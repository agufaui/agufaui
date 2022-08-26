import type { IProps, IPropsIcon } from "../prop.type";
// #region props
import type { IAMpanelLink } from "./AMpanel";
import type { IAMdropdownProps } from "./AMdropdown";

export type IAMsidebarLink = Omit<IAMpanelLink, "subtitle" | "subtitlec">;

export type IAMsidebarItem = IAMdropdownProps | IAMsidebarLink;

export interface IAMsidebarProps extends IProps {
	items: IAMsidebarItem[]; // menu items
	mdropdownt?: string; // common Amdropdown type for sidebar items
	mpanelt?: string; // common Ampanel type for sidebar items
	linkc?: string; // common css classes for type IAMsidebarLink 'a' html element
	linksc?: string; // css classes for menus and links container 'nav' html element
	ic?: string; // common css classes for type IAMsidebarLink icon 'span' html element
	vc?: string; // common css classes for type IAMsidebarLink title 'span' html element
}
// #endregion props
