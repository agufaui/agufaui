import { CDefaultType, CUseType } from "@agufaui/config";
import type { IAInputProps } from "../types/AInput";

export const CAInputLabel = "text-4 bg-white text-gray-7 duration-300";
export const CAInputLabelDisabled = "peer-disabled:text-gray-4";
export const CAInputLabelError = "peer-invalid:text-red-4";
export const CAInputLabelFocus =
	"peer-focus-within:(scale-90 -translate-y-3 z-0 ml-3 px-1 py-0 text-indigo-4)";
export const CAInputLabelPlaceholder =
	"[&:not(peer-placeholder-shown)]:(scale-90 -translate-y-3 z-0 ml-3 px-1 py-0 text-indigo-4)";

export const DAInputDefault = {
	aclass:
		"block peer bg-transparent p-2 max-h-12 text-4 text-gray-7 border border-gray-3 rounded-md shadow-md disabled:text-gray-4 focus:(outline-none ring ring-indigo-2/50 shadow-indigo)",
	lclass: CAInputLabel.concat(
		" ",
		CAInputLabelFocus,
		" ",
		CAInputLabelDisabled,
		" ",
		CAInputLabelError,
		" ",
		CAInputLabelPlaceholder
	),
};

export const DAInputInlineBlock = {
	[CUseType]: CDefaultType,
	cdisplay: "inline-block",
};

export const DAInput: Readonly<Record<string, IAInputProps>> = {
	[CDefaultType]: DAInputDefault,
	inlineblock: DAInputInlineBlock,
};
