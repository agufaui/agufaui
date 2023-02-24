import type { IProps, IPropsIcon } from "../../prop.type";
import type { TAMItem } from "../navigation/AMitem";
import type { IABadgeProps } from "../basic/ABadge";

// #region props
export interface IAMdropdownProps extends IProps, IPropsIcon {
	v: string; // menu name.  Not configurable
	items: TAMItem[]; // links array.  Not configurable
	expand?: boolean; // if expand initially
	titlesc?: string; // css classes for titles container 'div' html element
	vc?: string; // css classes for menu name 'p' html element
	badges?: IABadgeProps[]; // badges for title text.  Not configurable
	badgesc?: string; // css classes for badges container 'Asup' component
	arrowi?: string; // css arrow icon
	arrowic?: string; // css classes for arrow icon 'span' html element
	linksc?: string; // css classes for links container 'div' html element
}
// #endregion props
