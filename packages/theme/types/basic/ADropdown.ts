import type { IProps, IPropsIcon, IPropsForm } from "../../prop.type";

// #region props
export type TDropdownItem = {
	label: string;
	href: string;
};

export interface IADropdownProps extends IProps, IPropsForm {
	v?: string; // Display label.  Not configurable
	deco?: IADropdownDecoProps; // dropdown decorator
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

export type TDropdownSelectItem = {
	key: string;
	value: string;
};

export interface IADropdownSelectProps extends IProps, IPropsForm {
	deco?: IADropdownDecoProps; // dropdown decorator
	items: TDropdownSelectItem[]; //options.  Not configurable
	panelc?: string; // common css classes for items panel 'div'
	itemc?: string; // common css classes for each item 'a'
	keyc?: string; // common css classes for each item checkbox
	valuec?: string; // common css classes for each item display
}

export interface IADropdownDecoProps extends IProps, IPropsForm {
	control?: IADropdownControlProps; // dropdown control
	controlt?: string; // control type
	buttonc?: string; // css classes for dropdown button 'button'
	panelc?: string; // css classes items panel 'div'
}

export interface IADropdownControlProps extends IProps, IPropsIcon, IPropsForm {
	labelc?: string; // css classes for button text
	arrowi?: string; // arrow icon
	arrowc?: string; // css classes for arrow icon
}
// #endregion props

// #region emits
export interface IADropdownButtonEmits {
	(e: "click", event: string): void; // dropdown event
}

export interface IADropdownSelectEmits {
	(e: "toggle", key: string): void; // dropdown event
}

export interface IADropdownControlEmits {
	(e: "click", value: MouseEvent): void; // dropdown event
}
// #endregion emits

// Svelte events interface
export interface IADropdownButtonEmitsS {
	click: string; // dropdown event
}

export interface IADropdownSelectEmitsS {
	toggle: string; // dropdown event
}

export interface IADropdownControlEmitsS {
	click: MouseEvent; // dropdown event
}
