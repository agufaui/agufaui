import { CDefaultType, CUseType } from "@agufaui/config";
import type { IADropdownProps, IADropdownButtonProps } from "../../types/basic/ADropdown";

export const DADropdownDefault = {
	vc: "outline-gray-3 bg-white outline text-gray-7 hover:bg-gray-50 focus:(ring-offset-gray-1 ring-blue-5)",
	panelc: "w-28 md:w-56 animate-fade-in animate-duration-100",
	itemc: "px-4 py-2 text-sm text-gray-7 hover:(bg-gray-1 text-gray-9)",
};

export const DADropdownHoverText = {
	[CUseType]: CDefaultType,
	vc: "rf@ !rounded-lg bg-white hover:text-blue-5 text-gray-5 !font-semibold py-2 !px-2 !md:px-4",
};

export const DADropdown: Readonly<Record<string, Partial<IADropdownProps>>> = {
	[CDefaultType]: DADropdownDefault,
	hovertext: DADropdownHoverText,
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
