import { CDefaultType, CUseType } from "@agufaui/config";
import type { IASubProps } from "../types/ASub";

export const DASubDefault = {
	c: "text-xs",
};

export const DASubRec = {
	[CUseType]: CDefaultType,
	c: "px-1 py-0.2",
};

export const DASubRound = {
	[CUseType]: CDefaultType,
	c: "rounded-full px-1.5 py-0.2",
};

export const DASubIcon = {
	ic: "text-lg",
};

export const DASubCircle = {
	[CUseType]: CDefaultType,
	c: "rounded-1/2 aspect-square",
};

export const DASubOver = {
	[CUseType]: CDefaultType,
	c: "absolute bottom-0 translate-y-30% -translate-x-40%",
};

export const DASubOverRec = {
	[CUseType]: "over",
	c: "px-2 py-0.5",
};

export const DASubOverRound = {
	[CUseType]: "over",
	c: "rounded-full px-2 py-0.5",
};

export const DASubOverIcon = {
	ic: "text-lg",
	c: "absolute bottom-0 translate-y-30% -translate-x-50%",
};

export const DASubOverCircle = {
	[CUseType]: "default",
	c: "rounded-1/2 aspect-square absolute bottom-0 translate-y-20% -translate-x-50%",
};

export const DASubOverDot = {
	[CUseType]: "default",
	c: "rounded-1/2 aspect-square h-2 absolute bottom-0 translate-y-20% -translate-x-65%",
};

export const DASub: Readonly<Record<string, IASubProps>> = {
	[CDefaultType]: DASubDefault,
	rec: DASubRec,
	round: DASubRound,
	icon: DASubIcon,
	circle: DASubCircle,
	over: DASubOver,
	overrec: DASubOverRec,
	overround: DASubOverRound,
	overicon: DASubOverIcon,
	overcircle: DASubOverCircle,
	overdot: DASubOverDot,
};
