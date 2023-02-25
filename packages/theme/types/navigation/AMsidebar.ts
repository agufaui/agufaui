import type { IProps } from "../../prop.type";
// #region props
import type { IAMpanelProps } from "./AMpanel";

export interface IAMsidebarProps extends IProps {
	mpanel: IAMpanelProps; // menu panel
	mpanelc?: string; // css classes for menu panel contaienr 'nav' html element
}
// #endregion props
