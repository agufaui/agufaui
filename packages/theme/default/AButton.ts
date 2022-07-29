import { ThemeDefaultType } from "../default.const";
import type { IAButtonProps } from "../types/AButton";

export const DAButton: Readonly<Record<string, IAButtonProps>> = {
  [ThemeDefaultType]: {
    type: "button",
    py: "py-2",
    px: "px-4",
    size: "text-sm",
    color: "text-white",
    round: "rounded-md",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    focus: "focus:ring-blue-500",
    iconPosition: "left",
    loadingIcon: "i-eos-icons:loading",
    spaceX: "space-x-1.5",
  },
};
