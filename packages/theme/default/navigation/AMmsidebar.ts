import { CDefaultType } from "@agufaui/config";
import type { IAMmsidebarProps } from "../../types/navigation/AMmsidebar";

export const DAMmsidebarDefault = {
	overlayc: "bg-gray-6 opacity-75",
	closec:
		"mt-2 mr-0.5 h-10 aspect-square rounded-full focus:(outline-none ring-2 ring-inset ring-white)",
	closei: "i-ph:x-bold",
	closeic: "text-white text-xl",
	sidebarc: "max-w-xs w-full bg-gray-9",
	linksc: "px-2 py-4 bg-gray-8 space-y-1",
	linkc: "text-gray-3 hover:(bg-gray-7 text-white) group p-2 text-sm font-medium rounded-md",
	ic: "mr-4 text-lg text-gray-4 group-hover:text-gray-3",
	vc: "text-white",
};

export const DAMmsidebar: Readonly<Record<string, Partial<IAMmsidebarProps>>> = {
	[CDefaultType]: DAMmsidebarDefault,
};
