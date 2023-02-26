// @unocss-ignore
import type { IProps } from "../../prop.type";
import type { IATooltipProps } from "./ATooltip";

// #region props
export interface IALabelProps extends IProps {
	v: string; // message.  Not configurable
	vc?: string; // css classes for message 'span' html element
	id?: string; // control id label is for
	right?: boolean; // horizontally align position to the right
	required?: boolean; // if it's required
	requiredc?: string; // css classes for required sign '*'
	requiredec?: string; // css classes for required sign '*' when there is error
	error?: boolean; // if there is error
	tooltip?: IATooltipProps; // tooltip
}
// #endregion props
