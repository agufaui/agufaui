import { CDefaultType } from "@agufaui/config";
import type { IAMobileProps } from "../types/AMobile";

export const DAMobileDefault = {
	c: "rounded-sm p-1.5 shadow-sm text-2xl text-gray-400 hover:bg-gray-100 focus:outline-none",
};

export const DAMobile: Readonly<Record<string, IAMobileProps>> = {
	[CDefaultType]: DAMobileDefault,
};
