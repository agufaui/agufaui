import type { IProps, IPropsComposeX, IPropsIcon } from "../prop.type";

// #region props
export interface IASubProps extends IProps, IPropsComposeX, IPropsIcon {
	v?: string; // sub text.  Not configurable
	vc?: string; // css classes for text element
}
// #endregion props
