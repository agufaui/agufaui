import { CDefaultType } from "@agufaui/config";
import type { IAMmsidebarProps } from "../../types/navigation/AMmsidebar";

export const DAMmsidebarDefault = {
	overlayc: "bg-gray-6 opacity-75",
	closec:
		"mt-2 mr-0.5 h-10 aspect-square rounded-full focus:(outline-none ring-2 ring-inset ring-white)",
	closeic: "text-white text-xl",
	sidebarc: "max-w-xs w-full bg-gray-9",
};

export const DAMmsidebar: Readonly<Record<string, Partial<IAMmsidebarProps>>> = {
	[CDefaultType]: DAMmsidebarDefault,
};
