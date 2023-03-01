import type { IProps, IPropsIcon, IPropsForm } from "../../prop.type";

// #region props
export interface IASearchProps extends IProps, IPropsIcon, IPropsForm {
	v?: string; // search text.  Not configurable
	id?: string; // html element search 'id' and 'name' value, html element label 'for' value
	display?: string; // display class for root div html element
	vc?: string; // css classes for search 'input' html element
	iconc?: string; // css classes for search icon if input is not empty
	icondc?: string; // css classes for search icon if input is empty
}
// #endregion props

// #region emits
export interface IASearchEmits {
	(e: "update:v", modelValue: string): void; // input event
	(e: "search", modelValue: string): void; // search event
}
// #endregion emits

// Svelte events interface
export interface IASearchEmitsS {
	"update:v": string; // input event
	search: string; // search event
}
