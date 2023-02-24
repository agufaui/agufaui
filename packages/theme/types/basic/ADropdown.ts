import type { IProps, IPropsIcon, IPropsForm } from "../../prop.type";

// #region props
export type TDropdownItem = {
	label: string;
	href: string;
};

export interface IADropdownProps extends IProps, IPropsIcon, IPropsForm {
	v?: string; // Display label.  Not configurable
	vc?: string; // css classes for display button 'button'
	items: TDropdownItem[]; //options.  Not configurable
	panelc?: string; // css classes items panel 'div'
	itemc?: string; // common css classes for each item 'a'
}

export type TDropdownButtonItem = {
	icon?: string;
	display: string;
	event: string;
};

export interface IADropdownButtonProps extends IProps, IPropsIcon, IPropsForm {
	vc?: string; // css classes for display button 'button'
	dropdownc?: string; // css classes for dropdown button 'button'
	items: TDropdownButtonItem[]; //options.  Not configurable
	panelc?: string; // css classes items panel 'div'
	itemc?: string; // common css classes for each item 'a'
}
// #endregion props

// #region emits
export interface IADropdownButtonEmits {
	(e: "click", event: string): void; // dropdown event
}
// #endregion emits

// Svelte events interface
export interface IADropdownButtonEmitsS {
	click: string; // dropdown event
}
