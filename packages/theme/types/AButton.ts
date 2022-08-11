import type { IProps, IPropsComposeX, IPropsForm, IPropsLoading } from "../prop.type";

// #region props
export type ButtonType = "button" | "submit" | "reset" | undefined;

export interface IAButtonProps extends IProps, IPropsForm, IPropsComposeX, IPropsLoading {
	type?: ButtonType; // html element button type
	text?: string; // button text
	tclass?: string; // css classes for text element
	licon?: string; // loading icon eg. i-eos-icons:loading
	lclass?: string; // css classes for loading icon element
}
// #endregion props

// #region emits
export interface IAButtonEmits {
	(e: "click", event: MouseEvent): void; // click event
}
// #endregion emits
