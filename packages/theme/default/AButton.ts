import { DefaultType } from "../default.const";
import type { IAButtonProps } from "../types/AButton";

export const DAButton: Readonly<Record<string, IAButtonProps>> = {
  [DefaultType]: {
    type: "button",
    py: "py-2",
    px: "px-4",
    size: "text-sm",
    color: "text-white",
    round: "rounded-md",
    bg: "bg-blue-600",
    ifHover: "hover:bg-blue-700",
    ifFocus: "focus:ring-blue-500",
    iconPosition: "left",
    loadingIcon: "i-eos-icons:loading",
    spaceX: "space-x-1.5",
  },
};
