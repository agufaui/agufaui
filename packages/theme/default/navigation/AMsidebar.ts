import { CDefaultType } from "@agufaui/config";
import type { IAMsidebarProps } from "../../types/navigation/AMsidebar";

export const DAMsidebarDefault = {
	c: "w-64",
};

export const DAMsidebar: Readonly<Record<string, Partial<IAMsidebarProps>>> = {
	[CDefaultType]: DAMsidebarDefault,
};
