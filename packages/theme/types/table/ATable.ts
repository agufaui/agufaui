import type { IProps } from "../../prop.type";
import type { IADropdownSelectProps } from "types/basic/ADropdown";
import type { TTpanelEmit, IATpanelProps } from "./ATpanel";
import type { IAPaginationProps } from "./APagination";
import type { IASelectoptionProps } from "types/basic/ASelect";
import type { IAAlertErrorProps } from "types/utility/AAlertError";
import type { IAButtonProps } from "types/basic/AButton";
import type { IATagProps } from "types/basic/ATag";

// #region props
export type TTableFilter = {
	field: string;
	display: string;
	displayValue: string;
};

export interface IATableProps extends IProps {
	showPages?: boolean;
	recordsPerPageOption?: IASelectoptionProps;
	ifNew?: boolean;
	newButton?: IAButtonProps;
	ifDelete?: boolean;
	deleteButton?: IAButtonProps;
	numSelectedRows?: number;
	showHideColumnsOption?: IADropdownSelectProps;
	ifFilter?: boolean;
	filters?: TTableFilter[];
	tagProps?: IATagProps;
	alert?: IAAlertErrorProps;
	totalRecords?: number;
	offset?: number;
	ifSearch?: boolean;
	panel?: IATpanelProps;
	pagination?: IAPaginationProps;
}
// #endregion props

// #region emits
export interface IATableEmits {
	(e: "action", value: TTpanelEmit): void; // action event
	(e: "ope", value: TTpanelEmit): void; // operation event
	(e: "new", value: MouseEvent): void;
	(e: "delete", value: MouseEvent): void;
	(e: "removeFilter", value: TTableFilter): void;
	(e: "closeAlert", value: MouseEvent): void;
}
// #endregion emits

// Svelte events interface
export interface IATableEmitsS {
	action: TTpanelEmit; // action event
	ope: TTpanelEmit; // operation event
	new: MouseEvent;
	delete: MouseEvent;
	removeFilter: TTableFilter;
	closeAlert: MouseEvent;
}
