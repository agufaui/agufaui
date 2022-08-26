import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAMdropdownProps } from "../types/AMdropdown";

export const DAMdropdownDefault = {
	titlesc: "p-2 text-sm font-medium group",
	ic: "mr-4 text-lg",
	arrowic: "text-lg",
	linksc: "mt-1",
};

export const DAMdropdownSidebar = {
	[CUseType]: CDefaultType,
	titlesc: "text-white hover:text-gray-300",
};

export const DAMdropdown: Readonly<Record<string, Partial<IAMdropdownProps>>> = {
	[CDefaultType]: DAMdropdownDefault,
	sidebar: DAMdropdownSidebar,
};
