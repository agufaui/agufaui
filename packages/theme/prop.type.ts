import type { TComponentType } from "@agufaui/config";

// #region iprops
export interface IProps extends TComponentType {
	atype?: string; // user defined or AgufaUI provided component type
	aclass?: string; // css classes for html element button
}
// #endregion iprops

// #region ipropscomposex
export interface IPropsComposeX {
	spacex?: string; // space between elements in x-axis eg. space-x-1.5
}
// #endregion ipropscomposex

// #region ipropscomposey;

export interface IPropsComposeY {
	spacey?: string; // space between elements in y-axis eg. space-y-1.5
}
// #endregion ipropscomposey;

// #region ipropsform
export interface IPropsForm {
	disabled?: boolean; // disabled
}
// #endregion ipropsform

// #region ipropsicon
export type TLRPosition = "left" | "right";

export interface IPropsIcon {
	icon?: string; // icon eg. i-eos-icons:loading
	ipos?: TLRPosition; // icon position
	iclass?: string; // css classes for icon element
}
// #endregion ipropsicon

// #region ipropsloading
export interface IPropsLoading extends IPropsIcon {
	loading?: boolean; // loading
}
// #endregion ipropsloading
