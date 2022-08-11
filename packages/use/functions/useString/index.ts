import type { IUseString } from "./types";

export function useString(): IUseString {
	function pascalCaseToSpace(word: string): string {
		return word
			.replace(/([a-z])([A-Z])/g, "$1 $2")
			.replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
			.replace(/^./, (s: string) => s.toUpperCase())
			.trim();
	}

	function firstLetterToUpper(s: string): string {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	return { pascalCaseToSpace, firstLetterToUpper };
}

export * from "./types";
