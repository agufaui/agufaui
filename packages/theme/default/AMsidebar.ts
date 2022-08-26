import { CDefaultType } from "@agufaui/config";
import type { IAMsidebarProps } from "../types/AMsidebar";

export const DAMsidebarDefault = {
	c: "w-64",
	linksc: "px-2 py-4 bg-gray-800 space-y-1",
	linkc: "text-gray-300 hover:(bg-gray-700 text-white) group p-2 text-sm font-medium rounded-md",
	ic: "mr-4 text-lg text-gray-400 group-hover:text-gray-300",
	vc: "text-white",
};

export const DAMsidebar: Readonly<Record<string, Partial<IAMsidebarProps>>> = {
	[CDefaultType]: DAMsidebarDefault,
};
