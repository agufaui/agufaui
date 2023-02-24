import type { IProps, IPropsIcon } from "../../prop.type";
import type { IABadgeProps } from "../basic/ABadge";
import type { IAMpanelProps } from "./AMpanel";

// #region props
export interface IAMflyoutProps extends IProps, IPropsIcon {
	v: string; // menu name.  Not configurable
	vc?: string; // css classes for menu name 'p' html element
	titlesc?: string; // css classes for titles container 'div' html element
	badges?: IABadgeProps[]; // badges for title text.  Not configurable
	badgesc?: string; // css classes for badges container 'Asup' component
	showarrow?: boolean; // if show arrow
	arrowi?: string; // css arrow icon
	arrowic?: string; // css classes for arrow icon 'span' html element
	mpanel: IAMpanelProps; // menu panel.  Not configurable
	mpanelc?: string; // css classes for menu panel contaienr 'div' html element
}
// #endregion props
