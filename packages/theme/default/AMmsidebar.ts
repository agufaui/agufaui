import { CDefaultType } from "@agufaui/config";
import type { IAMmsidebarProps } from "../types/AMmsidebar";

export const DAMmsidebarDefault = {
	overlayc: "bg-gray-600 opacity-75",
	closec:
		"mt-2 mr-0.5 h-10 aspect-square rounded-full focus:(outline-none ring-2 ring-inset ring-white)",
	closei: "i-ph:x-bold",
	closeic: "text-white text-xl",
	sidebarc: "max-w-xs w-full bg-gray-900",
	linksc: "px-2 py-4 bg-gray-800 space-y-1",
	linkc: "text-gray-300 hover:(bg-gray-700 text-white) group p-2 text-sm font-medium rounded-md",
	ic: "mr-4 text-lg text-gray-400 group-hover:text-gray-300",
	vc: "text-white",
};

export const DAMmsidebar: Readonly<Record<string, Partial<IAMmsidebarProps>>> = {
	[CDefaultType]: DAMmsidebarDefault,
};
