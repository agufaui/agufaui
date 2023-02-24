import type { IProps, IPropsIcon, IPropsForm } from "../../prop.type";

// #region props
export interface IACheckboxProps extends IProps, IPropsIcon, IPropsForm {
	v: boolean; // if checked.  Not configurable
	vc?: string; // css classes for checkbox html element
	label?: string; // Not configurable
}
// #endregion props

// #region emits
export interface IACheckboxEmits {
	(e: "click", event: MouseEvent): void; // click event
}
// #endregion emits

// Svelte events interface
export interface IACheckboxEmitsS {
	click: MouseEvent; // click event
}
