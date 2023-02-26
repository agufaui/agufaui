// @unocss-ignore
import type { IProps } from "../../prop.type";
import type { IAAlertProps } from "../basic/AAlert";
import type { IAAlertErrorProps } from "types/utility/AAlertError";
import type { IALabelProps } from "types/basic/ALabel";

// #region props
export interface IASdProps<T extends IProps> extends IProps {
	labelasd?: IALabelProps; // label
	labelgridasdc?: string; // if there is a label, display grid
	labelgridspanasdc?: string; // if there is a label, dynamic component span how many columns of a grid
	uplabelasd?: boolean; // if label position at top of control
	vasd?: string; // component name (eg. button stands for Abutton).  Not configurable
	dirasd?: string; // component file dir (eg. button for Abutton)
	propsasd?: T; // component props
	attrsasd?: Record<string, any>; // html element attributes, eg. for 'a' tag, 'target' attribute
	errorasd?: boolean; // if there is error
	alertasd?: IAAlertProps;
	alerterrorasd?: IAAlertErrorProps;
}
// #endregion props
