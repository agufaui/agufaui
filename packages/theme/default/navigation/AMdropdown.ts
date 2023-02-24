import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAMdropdownProps } from "../../types/navigation/AMdropdown";

export const DAMdropdownDefault = {
	titlesc: "text-sm font-medium group",
	badgesc: "ml-0.5 space-x-0.5",
	ic: "mr-4 text-lg",
	arrowic: "text-lg",
	linksc: "mt-3 grid gap-4 ml-8.5",
};

export const DAMdropdownSidebar = {
	[CUseType]: CDefaultType,
	titlesc: "p-2 rounded-l-full hover:bg-blue-50",
	linksc: "d@mt-3 my-2 r@ gap-2",
};

export const DAMdropdownSidebarDark = {
	[CUseType]: CDefaultType,
	titlesc: "p-2 text-white rounded-l-full hover:bg-gray-7",
	linksc: "d@mt-3 my-2 r@ gap-2",
};

export const DAMdropdownElevation = {
	titlesc: "text-sm font-medium group",
	badgesc: "ml-0.5 space-x-0.5",
	ic: "mr-4 text-lg",
	arrowic: "text-lg",
	linksc: "mt-1 grid gap-4 p-4 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5",
};

export const DAMdropdown: Readonly<Record<string, Partial<IAMdropdownProps>>> = {
	[CDefaultType]: DAMdropdownDefault,
	sidebar: DAMdropdownSidebar,
	sidebarDark: DAMdropdownSidebarDark,
	elevation: DAMdropdownElevation,
};
