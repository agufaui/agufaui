import { CDefaultType } from "@agufaui/config";
import type { IAMtoggleProps } from "../../types/navigation/AMtoggle";

export const DAMtoggleDefault = {
	c: "rounded-sm p-1.5 shadow-sm text-2xl text-gray-4 hover:bg-gray-1 focus:outline-none",
};

export const DAMtoggle: Readonly<Record<string, Partial<IAMtoggleProps>>> = {
	[CDefaultType]: DAMtoggleDefault,
};
