import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAMlinkProps } from "../../types/navigation/AMlink";

export const DAMlinkDefault = {
	c: "text-sm font-medium rounded-md transition text-gray-8 hover:text-gray",
	badgesc: "ml-0.5 space-x-0.5",
	spacex: "space-x-4",
	ic: "text-lg",
	subtitlec: "mt-1 text-xs text-gray-5 hover:text-gray-7",
};

export const DAMlinkSidebar = {
	[CUseType]: CDefaultType,
	c: "p-2 rounded-l-full hover:bg-blue-50",
};

export const DAMlinkSidebarDark = {
	[CUseType]: CDefaultType,
	c: "p-2 rounded-l-full hover:bg-gray-7 !text-white d@text-gray-8 d@hover:text-gray",
	subtitlec: "text-gray-3 r@ hover:text-gray-4 d@text-gray-5",
};

export const DAMlink: Readonly<Record<string, Partial<IAMlinkProps>>> = {
	[CDefaultType]: DAMlinkDefault,
	sidebar: DAMlinkSidebar,
	sidebarDark: DAMlinkSidebarDark,
};
