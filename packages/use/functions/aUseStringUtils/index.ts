import type { AUseStringUtilsReturn } from "./types";

export function aUseStringUtils(): AUseStringUtilsReturn {
  function pascalCaseToSpace(word: string) {
    return word
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }

  return { pascalCaseToSpace };
}
