import { CDefaultType, CUseType } from "@agufaui/config";
import type { IACheckboxProps } from "../../types/basic/ACheckbox";

export const DACheckboxDefault = {
	vc: "bg-white outline-gray-2 outline rounded-sm h-5 w-5",
	ic: "text-white",
};

export const DACheckboxGreen = {
	[CUseType]: CDefaultType,
	vc: "text-green-5 focus:ring-green-3 hover:outline-green-2 peer-checked:ring-green-3",
};

export const DACheckboxBlue = {
	[CUseType]: CDefaultType,
	vc: "text-blue-5 focus:ring-blue-3 hover:outline-blue-2 peer-checked:ring-blue-3",
};

export const DACheckbox: Readonly<Record<string, Partial<IACheckboxProps>>> = {
	[CDefaultType]: DACheckboxDefault,
	green: DACheckboxGreen,
	blue: DACheckboxBlue,
};
