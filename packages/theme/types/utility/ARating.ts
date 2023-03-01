import type { IProps, IPropsComposeX, IPropsForm } from "../../prop.type";

// #region props
export interface IARatingProps extends IProps, IPropsComposeX, IPropsForm {
	v?: number; // rating score
	vc?: string; // css classes for rating star
	emptyi?: string; // empty star icon
	fulli?: string; // full star icon
	halfi?: string; // half star icon
	clickable?: boolean; // if clickable
	total?: number; // total number of stars
}
// #endregion props

// #region emits
export interface IARatingEmits {
	(e: "click", rating: number): void; // click event
}
// #endregion emits

// Svelte events interface
export interface IARatingEmitsS {
	click: number; // click event
}
