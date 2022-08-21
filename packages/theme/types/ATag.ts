import type { IProps, IPropsComposeX, TLRPosition } from "../prop.type";

// #region props
export interface IATagProps extends IProps, IPropsComposeX {
	v?: string; // tag text.  Not configurable
	vc?: string; // css classes for text element
	closeicon?: string; // icon for close button
	closec?: string; // css classes for close button
	pos?: TLRPosition; // position of text relative to close icon
}
// #endregion props

// #region emits
export interface IATagEmits {
	(e: "close", v: string): void; // close event, will emit v property
}
// #endregion emits

// Svelte events interface
export interface IATagEmitsS {
	close: string; // click event
}
