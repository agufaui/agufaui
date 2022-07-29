// #region iprops
export interface IProps {
  aType?: string; // user defined or AgufaUI provided component type
  aClass?: string; // css classes for html element button
  py?: string; // padding x-axis eg. py-2
  px?: string; // padding y-axis eg. px-2
  size?: string; // size of component eg. text-lg
  color?: string; // color of component eg. text-red-4
  round?: string; // corner roundness eg. rounded-md
  bg?: string; // background color eg. bg-blue-600/50
  hover?: string; // css classes for hover state eg. hover:bg-blue-700/50
  focus?: string; // css classes for focus state eg. focus:ring-blue-800/50
  fullWidth?: boolean; // full width
}
// #endregion iprops

// #region ipropscomposex
export interface IPropsComposeX {
  spaceX?: string; // space between elements in x-axis eg. space-x-1.5
}
// #endregion ipropscomposex

// #region ipropscomposey;

export interface IPropsComposeY {
  spaceY?: string; // space between elements in y-axis eg. space-y-1.5
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
  iconPosition?: TLRPosition; // icon position
  iconClass?: string; // css classes for icon element
}
// #endregion ipropsicon

// #region ipropsloading
export interface IPropsLoading extends IPropsIcon {
  loading?: boolean; // loading
}
// #endregion ipropsloading
