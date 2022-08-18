import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IABadgeProps extends IProps, IPropsComposeX, IPropsIcon {
	v?: string; // badge text.  Not configurable
	vc?: string; // css classes for text element
}
// #endregion props
