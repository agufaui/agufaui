import { defaultType } from "../types";
import type { AButtonProps } from "./types";

export const abutton: Readonly<Record<string, AButtonProps>> = {
  [defaultType]: {
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
