import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASdProps } from "../../types/form/ASd";

export const DASdDefault = {
	labelgridasdc: "grid grid-cols-3 grid-rows-3",
	labelgridspanasdc: "col-span-2 row-span-3",
};

export const DASdGrid4 = {
	[CUseType]: CDefaultType,
	labelgridasdc: "d@grid-cols-3 grid-cols-4",
	labelgridspanasdc: "d@col-span-2 col-span-3",
};

export const DASd: Readonly<Record<string, Partial<IASdProps<any>>>> = {
	[CDefaultType]: DASdDefault,
	grid4: DASdGrid4,
};
