import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAAProps } from "../types/AA";

export const DAADefault = {
	c: "rounded-md text-sm font-medium focus:outline-none",
	disablec: "opacity-50 pointer-events-none",
};

export const DAAFocus = {
	[CUseType]: CDefaultType,
	c: "focus:(ring-2 ring-offset-2)",
};

export const DAAFocusBlock = {
	[CUseType]: "focus",
	c: "block w-full",
};

export const DAACircle = {
	c: "aspect-square rounded-1/2 text-sm font-medium focus:(outline-none ring-2 ring-offset-2)",
	disablec: "opacity-50 pointer-events-none",
};

export const DAAButton = {
	c: "px-4 py-2 rounded-md text-sm font-medium focus:outline-none",
	disablec: "opacity-50 pointer-events-none",
};

export const DAAButtonFocus = {
	[CUseType]: "button",
	c: "focus:(ring-2 ring-offset-2)",
};

export const DAAButtonFocusBlock = {
	[CUseType]: "buttonfocus",
	c: "block w-full",
};

export const DAAButtonCircle = {
	c: "aspect-square rounded-1/2 text-sm font-medium focus:(outline-none ring-2 ring-offset-2)",
	disablec: "opacity-50 pointer-events-none",
};

export const DAA: Readonly<Record<string, IAAProps>> = {
	[CDefaultType]: DAADefault,
	focus: DAAFocus,
	focusblock: DAAFocusBlock,
	circle: DAACircle,
	button: DAAButton,
	buttonfocus: DAAButtonFocus,
	buttonfocusblock: DAAButtonFocusBlock,
	buttoncircle: DAAButtonCircle,
};
