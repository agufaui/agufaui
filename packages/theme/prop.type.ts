// #region iprops
export interface IProps {
	t?: string; // user defined or AgufaUI provided component type.  Not configurable
	c?: string; // css classes for component root html element
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
	i?: string; // icon eg. i-eos-icons:loading
	ipos?: TLRPosition; // icon position
	ic?: string; // css classes for icon element
}
// #endregion ipropsicon

// #region ipropsloading
export interface IPropsLoading extends IPropsIcon {
	loading?: boolean; // loading
}
// #endregion ipropsloading
