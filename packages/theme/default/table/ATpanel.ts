import { CDefaultType, CUseType } from "@agufaui/config";
import type { IATpanelProps } from "../../types/table/ATpanel";

export const DATpanelDefault = {
	multiSelectc: "py-2 px-3 border-b-2 border-gray-200 bg-gray-100",
	headingc:
		"px-5 py-3 text-left border-b-2 select-none cursor-pointer border-gray-2 bg-gray-1 text-xs font-semibold text-gray-6 uppercase tracking-wider hover:bg-gray-3",
	actionsc:
		"relative px-5 py-3 sticky border-b-2 border-gray-2 bg-gray-1 text-left text-xs font-semibold text-gray-6 uppercase tracking-wider",
	dirc: "text-blue-6",
	desc: "h-4 w-4",
	ic: "h-4 w-4",
	loadc: "text-blue h-10 w-10",
	emptyc: "text-gray-7",
	selectc: "border-dashed border-t border-gray-2 px-3 text-center",
	objectsc:
		"border-dashed border-t border-gray-2 px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-9",
	objectEventc: "text-blue-6 active:text-indigo-6 underline cursor-pointer",
	objectLinkc: "text-blue-6 active:text-indigo-6 underline",
	nonObjectsc:
		"border-dashed border-t border-gray-2 px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-9",
	actionc:
		"border-dashed border-t border-gray-2 px-5 py-4 whitespace-nowrap text-right text-sm font-medium",
};

export const DATpanel: Readonly<Record<string, IATpanelProps>> = {
	[CDefaultType]: DATpanelDefault,
};
