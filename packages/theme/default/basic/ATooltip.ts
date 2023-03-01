import { CDefaultType } from "@agufaui/config";
import type { IATooltipProps } from "../../types/basic/ATooltip";

export const DATooltipDefault = {
	vc: "bottom-6 rounded shadow-lg p-2 bg-blue-4 text-white min-w-12",
	ic: "text-blue-4 h-5 w-5",
};

export const DATooltip: Readonly<Record<string, IATooltipProps>> = {
	[CDefaultType]: DATooltipDefault,
};
