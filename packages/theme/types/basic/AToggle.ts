import type { IProps, IPropsComposeX, IPropsForm, TLRPosition } from "../../prop.type";
import type { IABadgeProps } from "./ABadge";

// #region props
export interface IAToggleProps extends IProps, IPropsComposeX, IPropsForm {
	v: boolean; // on/off state of toggle
	label?: IABadgeProps; // label, not configurable
	labelc?: string; // label css
	lpos?: TLRPosition; // label position
	id?: string; // button id, not configurable
	buttonon?: string; // css when toggle is on
	buttonoff?: string; // css when toggle is off
	buttononfocus?: string; // css focus when toggle is on
	buttonc?: string; // button css
	circlec?: string; // button circle css
}
// #endregion props

// #region emits
export interface IAToggleEmits {
	(e: "click", event: MouseEvent): void; // click event
}
// #endregion emits

// Svelte events interface
export interface IAToggleEmitsS {
	click: MouseEvent; // click event
}
