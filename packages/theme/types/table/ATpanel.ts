import type { IProps, IPropsLoading } from "../../prop.type";
import type { IADropdownButtonProps } from "types/basic/ADropdown";

// #region props
export type TTableHeadingObjectType = "link" | "event";

export type TTableHeading = {
	key: string; // object key, eg. 'id', 'name' in { id: 1, name: "john" }
	display: string; // display
	field?: string; // database field name
	direction?: string; // arrow icon direction, desc or asc
	// for object array
	type?: TTableHeadingObjectType;
	href?: string; // href url for type "Link"
	event?: string; // event to fire
};

export interface IATpanelProps extends IProps, IPropsLoading {
	multiSelect?: boolean; // if multiple select
	multiSelectc?: string; // css classes for multiSelect 'th' html element
	selectAll?: boolean; // if select all rows
	headings?: TTableHeading[]; // headings
	headingc?: string; // css classes for headings 'th' html element
	actionsc?: string; // css classes for actions 'th' html element
	dirc?: string; // common css classes for heading direction icons
	desci?: string; // descending icon
	descc?: string; // css classes for desc icon
	loadi?: string; // loading icon
	loadc?: string; // css classes for loading icon
	items?: any[]; // items
	emptyc?: string; // css classes for 'td' html element when table is empty
	selectc?: string; // css classes for select 'td' html element for each row
	isScalarArray?: boolean; // if it's an array of objects
	objectsc?: string; // css classes for object row
	objectEventc?: string; // css classes for event
	objectLinkc?: string; // css classes for link
	nonObjectsc?: string; // // css classes for non-object row
	actionc?: string; // css classes for action cell
	actions?: IADropdownButtonProps; // table row actions, eg. edit, delete
	refItem?: string | [] | object; // ref to the item row
}
// #endregion props

// #region emits
export type TTpanelEmit = {
	type: string;
	value: any;
};

export interface IATpanelEmits {
	(e: "action", value: TTpanelEmit): void; // action event
	(e: "ope", value: TTpanelEmit): void; // operation event
}
// #endregion emits

// Svelte events interface
export interface IATpanelEmitsS {
	action: TTpanelEmit; // action event
	ope: TTpanelEmit; // operation event
}
