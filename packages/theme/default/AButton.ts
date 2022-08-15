import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAButtonProps } from "../types/AButton";

export const DAButtonDefault = {
	aclass: "px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 focus:outline-none",
};

export const DAButtonFocus = {
	[CUseType]: CDefaultType,
	aclass: "focus:(ring-2 ring-offset-2)",
};

export const DAButtonFocusBlock = {
	[CUseType]: "focus",
	aclass: "block w-full",
};

export const DAButtonCircle = {
	aclass:
		"aspect-square rounded-1/2 text-sm font-medium disabled:opacity-50 focus:(outline-none ring-2 ring-offset-2)",
};

export const DAButton: Readonly<Record<string, IAButtonProps>> = {
	[CDefaultType]: DAButtonDefault,
	focus: DAButtonFocus,
	focusblock: DAButtonFocusBlock,
	circle: DAButtonCircle,
};
