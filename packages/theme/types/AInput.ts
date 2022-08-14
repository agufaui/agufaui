// @unocss-ignore
import type { IProps, IPropsForm } from "../prop.type";

// #region props
export interface IAInputProps extends IProps, IPropsForm {
	modelValue?: string; // input text.  Not configurable
	type?: string; // html element input type
	id?: string; // html element input 'id' and 'name' value, html element label 'for' value
	cdisplay?: string; // display class for container div html element
	cclass?: string; // css classes for container div html element
	label?: string; // label text.  Not configurable
	lclass?: string; // css classes for label html element
}
// #endregion props

// #region emits
export interface IAInputEmits {
	(e: "update:modelValue", modelValue: string): void; // input event
}
// #endregion emits
