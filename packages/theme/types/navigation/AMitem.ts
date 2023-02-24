import type { IProps } from "../../prop.type";
import type { IAMlinkProps } from "./AMlink";
import type { IAMdropdownProps } from "./AMdropdown";

// #region props
export type TAMItemComponentName = "dropdown" | "link";

export type TAMItem = {
	name: TAMItemComponentName; // component name
	props: IAMdropdownProps | IAMlinkProps;
	attrs?: Record<string, any>; // html element attributes, eg. for 'a' tag, 'target' attribute
};

export interface IAMitemProps extends IProps {
	v: TAMItem; // menu item.  Not configurable
}
// #endregion props
