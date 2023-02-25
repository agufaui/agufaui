import type { IProps, IPropsIcon, IPropsForm } from "../../prop.type";

// #region props
export type TSelectOption = {
	id: string | number;
	name: string;
	display?: string;
};

export interface IASelectProps extends IProps, IPropsIcon, IPropsForm {
	label?: string; // label.  Not configurable
	labelc?: string; // css classes for label html element
	buttonc?: string; // css classes for button
	options: TSelectOption[]; //options.  Not configurable
	v: TSelectOption; // selected option.  Not configurable
	vc?: string; // css classes for options
	id?: string; // select group id
	fullwidth?: boolean; // whether options panel full width or fit content
	displayc?: string; // css classes for option display
	optionc?: string; // css classes for option container 'div' html element
	selectedc?: string; // css classes for 'div' html element when selected
	checkc?: string; // css classes for check icon when selected
}
// #endregion props

// #region emits
export interface IASelectEmits {
	(e: "select", option: TSelectOption): void; // select event
}
// #endregion emits

// Svelte events interface
export interface IASelectEmitsS {
	select: TSelectOption; // select event
}
