import type { IProps, IPropsIcon } from "../prop.type";
import type { IAMpanelLink } from "./AMpanel";

// #region props
export interface IAMdropdownProps extends IProps, IPropsIcon {
	v: string; // menu name.  Not configurable
	links: IAMpanelLink[]; // links array.  Not configurable
	vc?: string; // css classes for menu name 'p' html element
	arrowi?: string; // css arrow icon
	arrowic?: string; // css classes for arrow icon 'span' html element
	titlesc?: string; // css classes for titles container 'div' html element
	linksc?: string; // css classes for links container 'div' html element
	mpanelt?: string; // 'Ampanel' component type
}
// #endregion props
