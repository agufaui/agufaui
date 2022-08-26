import type { IProps } from "../prop.type";
import type { IAMpanelLink } from "./AMpanel";

// #region props
export interface IAMflyoutProps extends IProps {
	v: string; // menu name.  Not configurable
	links: IAMpanelLink[]; // links array.  Not configurable
	vc?: string; // css classes for menu name 'p' html element
	linksc?: string; // css classes for links contaienr 'div' html element
	mpanelt?: string; // 'Ampanel' component type
}
// #endregion props
