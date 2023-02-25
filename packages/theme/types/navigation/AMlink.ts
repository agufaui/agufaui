import type { IProps, IPropsComposeX, IPropsIcon } from "../../prop.type";
import type { IABadgeProps } from "../basic/ABadge";

// #region props
export interface IAMlinkProps extends IProps, IPropsIcon, IPropsComposeX {
	href: string; // link url.  Not configurable
	v?: string; // link title.  Not configurable
	titlesc?: string; // css classes for link titles container 'span' html element
	vc?: string; // css classes for title 'p' html element
	badges?: IABadgeProps[]; // badges for title text.  Not configurable
	badgesc?: string; // css classes for badges container 'Asup' component
	subtitle?: string; // subtitle.  Not configurable
	subtitlec?: string; // css classes for subtitle 'p' html element
}
// #endregion props
