import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAMpanelProps } from "../../types/navigation/AMpanel";

export const DAMpanelDefault = {
	c: "overflow-hidden relative px-4 divide-y-1 divide-gray-6",
	sectionc: "py-4",
	titlec: "text-lg font-bold pl-2 pb-2",
};

export const DAMpanelRound = {
	[CUseType]: CDefaultType,
	c: "rounded-lg shadow-lg ring-1 ring-black ring-opacity-5",
};

export const DAMpanelFlyout = {
	[CUseType]: CDefaultType,
	c: "bg-white",
};

export const DAMpanelRoundFlyout = {
	[CUseType]: "round",
	c: "bg-white",
};

export const DAMpanelDark = {
	c: "overflow-hidden relative px-4 divide-y-1 divide-gray-4",
	sectionc: "py-4",
	titlec: "text-lg font-bold pl-2 pb-2 text-white",
};

export const DAMpanelNoDivide = {
	c: "overflow-hidden relative px-4",
	sectionc: "py-2",
	titlec: "text-lg font-bold pl-2 pb-2",
};

export const DAMpanel: Readonly<Record<string, Partial<IAMpanelProps>>> = {
	[CDefaultType]: DAMpanelDefault,
	flyout: DAMpanelFlyout,
	round: DAMpanelRound,
	roundFlyout: DAMpanelRoundFlyout,
	dark: DAMpanelDark,
	noDivide: DAMpanelNoDivide,
};
