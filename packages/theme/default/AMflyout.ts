import { CDefaultType } from "@agufaui/config";
import type { IAMflyoutProps } from "../types/AMflyout";

export const DAMflyoutDefault = {
	vc: "text-gray-900 rounded-md py-2 px-3 text-sm font-medium cursor-pointer hover:(bg-blue-100 text-gray-900) ",
	linksc:
		"z-10 -translate-x-1 w-screen max-w-xs px-2 sm:px-0 animate-fade-in-left animate-duration-200",
	mpanelt: "flyout",
};

export const DAMflyout: Readonly<Record<string, Partial<IAMflyoutProps>>> = {
	[CDefaultType]: DAMflyoutDefault,
};
