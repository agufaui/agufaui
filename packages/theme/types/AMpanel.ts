import type { IProps } from "../prop.type";

// #region props
export type IAMpanelLink = {
	v: string; // link title
	href: string; // link url
	vc?: string; // unique css classes for title 'p' html element
	hrefc?: string; // unique css classes for link 'a' html element
	i?: string; // icon
	ic?: string; // unique css classes for icon 'span' html element
	subtitle?: string; // subtitle
	subtitlec?: string; // unique css classes for subtitle 'p' html element
};

export interface IAMpanelProps extends IProps {
	links: IAMpanelLink[]; // links array.  Not configurable
	linkc?: string; // common css classes for links 'a' html element
	ic?: string; // common css classes for icon 'span' html element
	titlesc?: string; // css classes for titles container 'span' html element
	vc?: string; // common css classes for link title 'p' html element
	subtitlec?: string; // common css classes for subtitle 'p' html element
}
// #endregion props
