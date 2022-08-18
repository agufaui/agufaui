import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASupProps } from "../types/ASup";

export const DASupDefault = {
	c: "text-xs",
};

export const DASupRec = {
	[CUseType]: CDefaultType,
	c: "px-1 py-0.2",
};

export const DASupRound = {
	[CUseType]: CDefaultType,
	c: "rounded-full px-1.5 py-0.2",
};

export const DASupIcon = {
	ic: "text-lg",
};

export const DASupCircle = {
	[CUseType]: CDefaultType,
	c: "rounded-1/2 aspect-square",
};

export const DASupOver = {
	[CUseType]: CDefaultType,
	c: "absolute top-0 -translate-y-50% -translate-x-40%",
};

export const DASupOverRec = {
	[CUseType]: "over",
	c: "px-2 py-0.5",
};

export const DASupOverRound = {
	[CUseType]: "over",
	c: "rounded-full px-2 py-0.5",
};

export const DASupOverIcon = {
	ic: "text-lg",
	c: "absolute top-0 -translate-y-50% -translate-x-50%",
};

export const DASupOverCircle = {
	[CUseType]: "default",
	c: "rounded-1/2 aspect-square absolute top-0 -translate-y-50% -translate-x-50%",
};

export const DASupOverDot = {
	[CUseType]: "default",
	c: "rounded-1/2 aspect-square h-2 absolute top-0 -translate-y-30% -translate-x-65%",
};

export const DASup: Readonly<Record<string, IASupProps>> = {
	[CDefaultType]: DASupDefault,
	rec: DASupRec,
	round: DASupRound,
	icon: DASupIcon,
	circle: DASupCircle,
	over: DASupOver,
	overrec: DASupOverRec,
	overround: DASupOverRound,
	overicon: DASupOverIcon,
	overcircle: DASupOverCircle,
	overdot: DASupOverDot,
};
