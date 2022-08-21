import type { IProps, IPropsForm } from "../prop.type";

// #region props
export interface IAInputProps extends IProps, IPropsForm {
	v?: string; // input text.  Not configurable
	type?: string; // html element input type
	id?: string; // html element input 'id' and 'name' value, html element label 'for' value
	display?: string; // display class for root div html element
	vc?: string; // css classes for input html element
	label?: string; // label text.  Not configurable
	labelc?: string; // css classes for label html element
}
// #endregion props

// #region emits
export interface IAInputEmits {
	(e: "update:v", modelValue: string): void; // input event
}
// #endregion emits

// Svelte events interface
export interface IAInputEmitsS {
	"update:v": string; // click event
}
