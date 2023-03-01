import { CDefaultType } from "@agufaui/config";
import type { IALabelProps } from "../../types/basic/ALabel";

export const DALabelDefault = {
	cc: "pr-2",
	vc: "text-sm bg-white px-2 text-gray-7",
	requiredc: "text-blue-4",
	requiredec: "text-red-4",
};

export const DALabel: Readonly<Record<string, Partial<IALabelProps>>> = {
	[CDefaultType]: DALabelDefault,
};
