import { CDefaultType } from "@agufaui/config";
import type { IAMtoggleProps } from "../types/AMtoggle";

export const DAMtoggleDefault = {
	c: "rounded-sm p-1.5 shadow-sm text-2xl text-gray-400 hover:bg-gray-100 focus:outline-none",
};

export const DAMtoggle: Readonly<Record<string, Partial<IAMtoggleProps>>> = {
	[CDefaultType]: DAMtoggleDefault,
};
