import { CDefaultType, CUseType } from "@agufaui/config";
import type {
	IADropdownProps,
	IADropdownButtonProps,
	IADropdownSelectProps,
	IADropdownDecoProps,
	IADropdownControlProps,
} from "../../types/basic/ADropdown";

export const DADropdownDefault = {
	panelc:
		"w-28 md:w-56 animate-fade-in animate-duration-100 origin-top-right right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
	itemc: "px-4 py-2 text-sm text-gray-7 hover:(bg-gray-1 text-gray-9)",
};

export const DADropdown: Readonly<Record<string, Partial<IADropdownProps>>> = {
	[CDefaultType]: DADropdownDefault,
};

export const DADropdownButtonDefault = {
	vc: "text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)",
	dropdownc:
		"px-1 border-l border-white text-sm font-medium rounded-r-md text-white bg-blue-5 hover:bg-blue-6 focus:ring-blue-5 disabled:(opacity-50 cursor-not-allowed)",
	panelc: "w-full divide-y divide-gray-3 shadow-lg",
	itemc: "text-white rounded-none bg-blue-5 hover:bg-blue-6 focus:ring-blue-5",
};

export const DADropdownButton: Readonly<Record<string, Partial<IADropdownButtonProps>>> = {
	[CDefaultType]: DADropdownButtonDefault,
};

export const DADropdownSelectDefault = {
	panelc: "right-0 z-40 w-40 bg-white rounded-lg shadow-lg mt-2 -mr-1 block py-1 overflow-hidden",
	itemc: "hover:bg-gray-1 px-4 py-2 space-x-3",
	keyc: "text-green-6",
	valuec: "text-gray-7 pb-1.5",
};

export const DADropdownSelect: Readonly<Record<string, Partial<IADropdownSelectProps>>> = {
	[CDefaultType]: DADropdownSelectDefault,
};

export const DADropdownDecoDefault = {};

export const DADropdownDeco: Readonly<Record<string, Partial<IADropdownDecoProps>>> = {
	[CDefaultType]: DADropdownDecoDefault,
};

export const DADropdownControlDefault = {
	c: "shadow rounded-lg inline-flex items-center bg-white justify-between space-x-1 hover:text-blue-5  focus:outline-none text-gray-5 font-semibold py-2 px-2 md:px-4",
	ic: "hidden",
};

export const DADropdownControlOutline = {
	c: "px-4 py-2 rounded-md inline-flex items-center text-sm justify-between space-x-1 font-medium select-none outline-gray-3 bg-white outline text-gray-7 hover:bg-gray-50 focus:(outline-none ring-2 ring-offset-2 ring-blue-3)",
	ic: "hidden",
};

export const DADropdownControlResponsive = {
	[CUseType]: CDefaultType,
	ic: "d@hidden md:hidden",
	labelc: "hidden md:block",
};

export const DADropdownControl: Readonly<Record<string, Partial<IADropdownControlProps>>> = {
	[CDefaultType]: DADropdownControlDefault,
	outline: DADropdownControlOutline,
	res: DADropdownControlResponsive,
};
