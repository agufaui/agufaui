import { CDefaultType } from "@agufaui/config";
import type { IADrawerProps } from "../../types/basic/ADrawer";

export const DADrawerDefault = {
	overlayc: "bg-gray-6 opacity-75",
	closec:
		"mt-2 mr-0.5 h-10 aspect-square rounded-full focus:(outline-none ring-2 ring-inset ring-white)",
	closeic: "text-white text-xl",
};

export const DADrawer: Readonly<Record<string, IADrawerProps>> = {
	[CDefaultType]: DADrawerDefault,
};
