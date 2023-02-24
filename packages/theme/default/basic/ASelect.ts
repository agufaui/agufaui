import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASelectProps } from "../../types/basic/ASelect";

export const DASelectDefault = {
	labelc: "text-gray-7",
	buttonc: "focus:(ring-blue-2 outline-blue-3)",
	ic: "text-gray-4",
	optionc: "hover:text-white hover:bg-blue-6 text-gray-9",
	selectedc: "text-white bg-blue-6",
	checkc: "text-blue-6",
};

export const DASelectGreen = {
	[CUseType]: CDefaultType,
	buttonc: "r@ focus:ring-green-2 r@ focus:outline-green-3",
	optionc: "r@ hover:bg-green-6",
	selectedc: "r@ bg-green-6",
	checkc: "r@ text-green-6",
};

export const DASelect: Readonly<Record<string, Partial<IASelectProps>>> = {
	[CDefaultType]: DASelectDefault,
	green: DASelectGreen,
};
