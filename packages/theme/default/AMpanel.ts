import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAMpanelProps } from "../types/AMpanel";

export const DAMpanelDefault = {
	c: "rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden relative grid gap-4 p-4",
	linkc: "px-2 py-3 text-sm font-medium rounded-md transition",
	iconc: "text-lg",
	titlesContainerc: "ml-4",
	subtitlec: "mt-1 text-xs text-gray-500",
};

export const DAMpanelFlyout = {
	[CUseType]: CDefaultType,
	c: "bg-white md:gap-8 md:p-8",
	linkc: "hover:bg-blue-50",
};

export const DAMpanel: Readonly<Record<string, IAMpanelProps>> = {
	[CDefaultType]: DAMpanelDefault,
	flyout: DAMpanelFlyout,
};
