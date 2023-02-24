import { CDefaultType } from "@agufaui/config";
import type { IAToggleProps } from "../../types/basic/AToggle";

export const DAToggleDefault = {
	c: "focus:outline-none",
	labelc: "font-medium text-gray-9",
};

export const DAToggle: Readonly<Record<string, Partial<IAToggleProps>>> = {
	[CDefaultType]: DAToggleDefault,
};
