import { CDefaultType, CUseType } from "@agufaui/config";
import type { IATextareaProps } from "../../types/basic/ATextarea";

export const CATextareaLabel = "text-4 bg-white text-gray-7 duration-300";
export const CATextareaLabelDisabled = "!peer-disabled:opacity-50";
export const CATextareaLabelError = "!peer-invalid:text-red-4";
export const CATextareaLabelFocus =
	"peer-focus-within:(scale-90 -translate-y-3 z-0 ml-3 px-1 py-0 text-indigo-4)";
export const CATextareaLabelPlaceholder =
	"peer-not-placeholder-shown:(scale-90 -translate-y-3 z-0 ml-3 px-1 py-0 text-indigo-4)";

export const DATextareaDefault = {
	vc: "block peer bg-transparent p-2 text-4 text-gray-7 outline outline-gray-3 rounded-md shadow-md disabled:(opacity-50 cursor-not-allowed) focus:(outline-none ring ring-indigo-2/50 shadow-indigo)",
	labelc: CATextareaLabel.concat(
		" ",
		CATextareaLabelFocus,
		" ",
		CATextareaLabelDisabled,
		" ",
		CATextareaLabelError,
		" ",
		CATextareaLabelPlaceholder
	),
};

export const DATextareaInlineBlock = {
	[CUseType]: CDefaultType,
	display: "inline-block",
};

export const DATextarea: Readonly<Record<string, Partial<IATextareaProps>>> = {
	[CDefaultType]: DATextareaDefault,
	inlineblock: DATextareaInlineBlock,
};
