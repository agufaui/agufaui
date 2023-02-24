import { CDefaultType, CUseType } from "@agufaui/config";
import type { IARadioProps } from "../../types/basic/ARadio";

export const DARadioDefault = {
	labelc: "font-medium text-lg text-gray-6",
	fieldsetc: "mt-2",
	optionc: "p-2 hover:bg-blue-50",
	selectedc: "bg-blue-50",
	vc: "focus:ring-blue-5 accent-blue-6 h-4 w-4 outline-gray-3 m-0",
	displayc: "ml-3 font-medium text-sm text-gray-9",
};

export const DARadioGreen = {
	[CUseType]: CDefaultType,
	optionc: "r@ hover:bg-green-50",
	selectedc: "r@ bg-green-50",
	vc: "r@ focus:ring-green-5 r@ accent-green-6",
};

export const DARadio: Readonly<Record<string, Partial<IARadioProps>>> = {
	[CDefaultType]: DARadioDefault,
	green: DARadioGreen,
};
