// @unocss-ignore
import type { IProps, IPropsIcon } from "../../prop.type";

// #region props
export interface IATooltipProps extends IProps, IPropsIcon {
	v?: string; // message.  Not configurable
	vc?: string; // css classes for message 'span' html element
}
// #endregion props
