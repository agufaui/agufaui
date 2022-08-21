import type { IProps, IPropsComposeX, IPropsForm, IPropsLoading } from "../prop.type";

// #region props
export interface IAAProps extends IProps, IPropsForm, IPropsComposeX, IPropsLoading {
	v?: string; // link text.  Not configurable
	vc?: string; // css classes for text element
	loadicon?: string; // loading icon eg. i-eos-icons:loading
	loadc?: string; // css classes for loading icon element
	disablec?: string; // css classes for disabled state
	tabindex?: number; // tabindex for link
}
// #endregion props

// #region emits
export interface IAAEmits {
	(e: "click", event: MouseEvent): void; // click event
}
// #endregion emits

// Svelte events interface
export interface IAAEmitsS {
	click: MouseEvent; // click event
}
