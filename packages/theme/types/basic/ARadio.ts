import type { IProps, IPropsForm } from "../../prop.type";

// #region props
export type TRadioOption = {
	id: string | number;
	name: string;
};

export interface IARadioProps extends IProps, IPropsForm {
	label?: string; // label.  Not configurable
	labelc?: string; // css classes for label html element
	options: TRadioOption[]; //options.  Not configurable
	v: TRadioOption; // selected option.  Not configurable
	vc?: string; // css classes for options
	id?: string; // radio group id
	displayc?: string; // css classes for display label
	optionc?: string; // css classes for option container 'div' html element
	fieldsetc?: string; // css classes for fieldset
	selectedc?: string; // css classes for 'div' html element when selected
}
// #endregion props

// #region emits
export interface IARadioEmits {
	(e: "select", option: TRadioOption): void; // select event
}
// #endregion emits

// Svelte events interface
export interface IARadioEmitsS {
	select: TRadioOption; // select event
}
