import type { IProps, IPropsForm } from "../../prop.type";

// #region props
export interface IATextareaProps extends IProps, IPropsForm {
	id?: string; // html element textarea 'id' and 'name' value, html element label 'for' value
	display?: string; // display class for root div html element
	v: string; // textarea text.  Not configurable
	vc?: string; // css classes for textarea html element
	maxlength?: number; // maxlength
	label?: string; // label text.  Not configurable
	labelc?: string; // css classes for label html element
}
// #endregion props

// #region emits
export interface IATextareaEmits {
	(e: "update:v", modelValue: string): void; // textarea event
}
// #endregion emits

// Svelte events interface
export interface IATextareaEmitsS {
	"update:v": string; // click event
}
