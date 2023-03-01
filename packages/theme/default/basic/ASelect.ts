import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASelectProps, IASelectoptionProps } from "../../types/basic/ASelect";

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

export const DASelectoptionDefault = {
	labelc: "text-gray-7 sm:mr-2",
	vc: "pl-3 pr-10 py-2 text-base rounded-md outline outline-gray-3 focus:(outline-none ring ring-blue-5 focus:outline-blue-5)",
};

export const DASelectoption: Readonly<Record<string, Partial<IASelectoptionProps>>> = {
	[CDefaultType]: DASelectoptionDefault,
};
