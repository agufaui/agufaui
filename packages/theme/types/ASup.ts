import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IASupProps extends IProps, IPropsComposeX, IPropsIcon {
	v?: string; // sup text.  Not configurable
	vc?: string; // css classes for text element
}
// #endregion props
