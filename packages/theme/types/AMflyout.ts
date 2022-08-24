import type { IProps } from "../prop.type";
import type { IAMpanelLink } from "./AMpanel";

// #region props
export interface IAMflyoutProps extends IProps {
	v?: string; // menu name.  Not configurable
	vc?: string; // css classes for menu name 'p' html element
	links?: IAMpanelLink[]; // links array.  Not configurable
	linksContainerc?: string; // common css classes for links 'a' html element
	mpanelType?: string; // 'Ampanel' component type
}
// #endregion props
