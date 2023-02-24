import type { IProps } from "../../prop.type";
import type { TAMItem } from "./AMitem";

// #region props
export type TAMSection = {
	title?: string;
	items: TAMItem[];
};

export interface IAMpanelProps extends IProps {
	sections: TAMSection[]; // links sections array.  Not configurable
	sectionc?: string; // css classes for 'div' html element that contains a section
	titlec?: string; // css classes for 'p' html element that contains title
}
// #endregion props
