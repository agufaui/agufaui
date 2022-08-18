import { CDefaultType, CUseType } from "@agufaui/config";
import type { IATagProps } from "../types/ATag";

export const DATagDefault = {
	c: "text-xs",
};

export const DATagRec = {
	[CUseType]: CDefaultType,
	c: "px-2 py-1",
};

export const DATagRound = {
	[CUseType]: CDefaultType,
	c: "rounded-md px-2 py-1",
};

export const DATag: Readonly<Record<string, IATagProps>> = {
	[CDefaultType]: DATagDefault,
	rec: DATagRec,
	round: DATagRound,
};
