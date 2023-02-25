import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASearchProps } from "../../types/basic/ASearch";

export const DASearchDefault = {
	vc: "block w-full bg-white rounded-md ring-1.5 ring-blue-3 shadow-md py-2 pl-3 pr-10 text-sm placeholder-gray-5 focus:(ring-0 text-gray-9 placeholder-gray-4 outline outline-blue-3)",
	iconc: "text-green-4 hover:text-green-5",
	icondc: "text-gray-4 hover:text-gray-5",
};

export const DASearchInlineBlock = {
	[CUseType]: CDefaultType,
	display: "inline-block",
};

export const DASearch: Readonly<Record<string, Partial<IASearchProps>>> = {
	[CDefaultType]: DASearchDefault,
	inlineblock: DASearchInlineBlock,
};
