import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASdProps } from "../../types/form/ASd";

export const DASdDefault = {
	labelgridasdc: "grid grid-cols-3",
	labelgridspanasdc: "col-span-2",
};

export const DASdGrid4 = {
	[CUseType]: CDefaultType,
	labelgridasdc: "d@grid-cols-3 grid-cols-4",
	labelgridspanasdc: "d@col-span-2 col-span-3",
};

export const DASdResponsive = {
	labelgridasdc: "grid sm:grid-cols-3",
	labelgridspanasdc: "sm:col-span-2",
	labelc: "justify-start sm:justify-end",
};

export const DASdResponsiveGrid4 = {
	[CUseType]: "res",
	labelgridasdc: "d@sm:grid-cols-3 sm:grid-cols-4",
	labelgridspanasdc: "d@sm:col-span-2 sm:col-span-3",
};

export const DASd: Readonly<Record<string, Partial<IASdProps<any>>>> = {
	[CDefaultType]: DASdDefault,
	grid4: DASdGrid4,
	res: DASdResponsive,
	resgrid4: DASdResponsiveGrid4,
};
