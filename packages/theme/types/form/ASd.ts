// @unocss-ignore
import type { IProps, IPropsComposeY } from "../../prop.type";
import type { IAAlertProps } from "../basic/AAlert";
import type { IAAlertErrorProps } from "types/utility/AAlertError";
import type { IALabelProps } from "types/basic/ALabel";
import type { IABadgeProps } from "types/basic/ABadge";

// #region props
export interface IASdProps<T extends IProps> extends IProps, IPropsComposeY {
	labelasd?: IALabelProps; // label
	labelgridasdc?: string; // if there is a label, display grid
	labelgridspanasdc?: string; // if there is a label, dynamic component span how many columns of a grid
	uplabelasd?: boolean; // if label position at top of control
	componentc?: string; // css classes for component container 'div' html element
	vasd?: string; // component name (eg. button stands for Abutton).  Not configurable
	dirasd?: string; // component file dir (eg. button for Abutton)
	propsasd?: T; // component props
	attrsasd?: Record<string, any>; // html element attributes, eg. for 'a' tag, 'target' attribute
	errorasd?: boolean; // if there is error
	prependasd?: IABadgeProps; // prepend to dynamic component
	postpendasd?: IABadgeProps; // postpend to dynamic component
	infoc?: string; // css classes for info message `aalert` child component
	alertasd?: IAAlertProps;
	msgc?: string; // css classes for error or success message `aalertError` child component
	alerterrorasd?: IAAlertErrorProps;
}
// #endregion props
