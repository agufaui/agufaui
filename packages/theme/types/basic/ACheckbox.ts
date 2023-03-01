import type { IProps, IPropsIcon, IPropsForm } from "../../prop.type";

// #region props
export interface IACheckboxProps extends IProps, IPropsIcon, IPropsForm {
	v?: boolean; // if checked.  Not configurable
	vc?: string; // css classes for div html element
	label?: string; // Not configurable
	inputc?: string; // css classes for 'input' html element
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
