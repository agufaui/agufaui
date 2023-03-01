import { CDefaultType, CUseType } from "@agufaui/config";
import type { IABadgeProps } from "../../types/basic/ABadge";

export const DABadgeDefault = {
	c: "text-xs",
};

export const DABadgeRec = {
	[CUseType]: CDefaultType,
	c: "px-2 py-0.5",
};

export const DABadgeRound = {
	[CUseType]: CDefaultType,
	c: "rounded-full px-2 py-0.5",
};

export const DABadgeIcon = {
	c: "text-xl",
};

export const DABadgeCircle = {
	[CUseType]: CDefaultType,
	c: "rounded-1/2 aspect-square h-6",
};

export const DABadgeLabel = {
	c: "text-base",
};

export const DABadgePre = {
	c: "rounded-l-lg text-gray-9 text-lg bg-gray-2 px-2 h-10 shadow-md",
};

export const DABadgePost = {
	c: "rounded-r-lg text-gray-9 text-lg bg-gray-2 px-2 h-10 shadow-md",
};

export const DABadge: Readonly<Record<string, IABadgeProps>> = {
	[CDefaultType]: DABadgeDefault,
	rec: DABadgeRec,
	round: DABadgeRound,
	icon: DABadgeIcon,
	circle: DABadgeCircle,
	label: DABadgeLabel,
	pre: DABadgePre,
	post: DABadgePost,
};
