import { CDefaultType } from "@agufaui/config";
import type { IAMflyoutProps } from "../../types/navigation/AMflyout";

export const DAMflyoutDefault = {
	vc: "text-gray-9 rounded-md py-2 px-3 text-sm font-medium hover:(bg-blue-1 text-gray-9) ",
	mpanelc:
		"z-10 -translate-x-1 w-screen max-w-xs px-2 sm:px-0 animate-fade-in-left animate-duration-200",
};

export const DAMflyoutArrow = {
	vc: "text-gray-9 py-2 pr-1 text-sm font-medium",
	mpanelc:
		"z-10 -translate-x-1 w-screen max-w-xs px-2 sm:px-0 animate-fade-in animate-duration-200",
	c: "group",
	titlesc: "group-hover:(border-b-solid border-2)",
};

export const DAMflyout: Readonly<Record<string, Partial<IAMflyoutProps>>> = {
	[CDefaultType]: DAMflyoutDefault,
	arrow: DAMflyoutArrow,
};
