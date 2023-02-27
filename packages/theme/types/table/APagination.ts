import type { IProps, IPropsIcon, IPropsComposeX, TLRPosition } from "../../prop.type";

// #region props
export interface IAPaginationProps extends IProps, IPropsIcon, IPropsComposeX {
	totalPages?: number;
	numPagesShow?: number; // number pages shown, eg. for value of 3, it will show: 1 2 3 ... 8 9 10 ... 21 22 23
	currentPage?: number;
	goto?: boolean; // if display goto input
	gotoPos?: TLRPosition; // goto position
	gotoc?: string; // css classes for goto container 'div' html element
	paginationc?: string; // css classes for pagination container 'div' html element
	vc?: string; // css classes for current page element
	ovc?: string; // css classes for not-current page element
	prec?: string; // css classes for 'previous' and 'next' button
	pagec?: string; // common css classes for every page button
	markc?: string; // css classes for 'left mark' and 'right mark' sign: '...'
	lefti?: string; // left arrow icon
}
// #endregion props

// #region emits
export interface IAPaginationEmits {
	(e: "change", page: number): void; // change event
}
// #endregion emits

// Svelte events interface
export interface IAPaginationEmitsS {
	change: number; // change event
}
