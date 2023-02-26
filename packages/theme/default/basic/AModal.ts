import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAModalProps } from "../../types/basic/AModal";

export const DAModalDefault = {
	closec: "text-xs text-gray-4 hover:text-gray-6 mt-1",
	panelc:
		"align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",
};

export const DAModal: Readonly<Record<string, Partial<IAModalProps>>> = {
	[CDefaultType]: DAModalDefault,
};
