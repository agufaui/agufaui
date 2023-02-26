// @unocss-ignore
import type { IProps } from "../../prop.type";

// #region props
export type TPos = "top" | "bottom" | "left" | "right";

export interface IADrawerProps extends IProps {
	show?: boolean; // show drawer
	pos?: TPos; // display class for container 'div' html element
	permanent?: boolean; // is component closable, default is closable
	overlayc?: string; // css classes for background overlay 'div' html element
	closec?: string; // css classes for close button 'button' html element
	closei?: string; // css close button icon
	closeic?: string; // css classes for close button icon 'span' html element
	sidebarc?: string; // css classes for sidebar container 'div' html element
}
// #endregion props

// #region emits
export interface IADrawerEmits {
	(e: "close"): void; // close event
}
// #endregion emits

// Svelte events interface
export interface IADrawerEmitsS {
	close: void; // close event
}
