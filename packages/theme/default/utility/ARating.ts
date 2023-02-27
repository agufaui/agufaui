import { CDefaultType } from "@agufaui/config";
import type { IARatingProps } from "../../types/utility/ARating";

export const DARatingDefault = {
	vc: "text-amber-5",
};

export const DARating: Readonly<Record<string, Partial<IARatingProps>>> = {
	[CDefaultType]: DARatingDefault,
};
