import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAPaginationProps } from "../../types/table/APagination";

export const DAPaginationDefault = {
	c: "px-4 sm:px-0",
	vc: "ring ring-blue-5 rounded-lg shadow-md shadow-blue !text-blue-6",
	ovc: "outline-transparent !text-gray-5 hover:!text-gray-7 hover:!outline-gray-3",
	prec: "pr-1 inline-flex items-center text-sm font-medium !text-gray-5 hover:!text-gray-7",
	pagec: "px-4 inline-flex items-center text-sm font-medium",
	markc: "outline-transparent text-gray-5 pt-4 px-4 inline-flex items-center text-sm font-medium",
	ic: "text-gray-4 text-xl",
};

export const DAPagination: Readonly<Record<string, IAPaginationProps>> = {
	[CDefaultType]: DAPaginationDefault,
};
