import type { UseComponentReturn } from "./types";

export function useComponent(): UseComponentReturn {
  function getColorCSS(color: String): String {
    switch (color) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
      case "green":
        return "bg-green-600 hover:bg-green-700 focus:ring-green-500";
      case "gray":
        return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500";
      case "red":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      default:
        return "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
    }
  }

  return { getColorCSS };
}
