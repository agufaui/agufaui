import type { IProps } from "../prop.type";

// #region props
export type IAMpanelLink = {
	title: string; // link title
	titleClass?: string; // unique css classes for title 'p' html element
	href: string; // link url
	hrefClass?: string; // unique css classes for link 'a' html element
	icon?: string; // icon
	iconClass?: string; // unique css classes for icon 'span' html element
	subtitle?: string; // subtitle
	subtitleClass?: string; // unique css classes for subtitle 'p' html element
};

export interface IAMpanelProps extends IProps {
	links?: IAMpanelLink[]; // links array.  Not configurable
	linkc?: string; // common css classes for links 'a' html element
	iconc?: string; // common css classes for icon 'span' html element
	titlesContainerc?: string; // css classes for titles container 'span' html element
	titlec?: string; // common css classes for title 'p' html element
	subtitlec?: string; // common css classes for subtitle 'p' html element
}
// #endregion props
