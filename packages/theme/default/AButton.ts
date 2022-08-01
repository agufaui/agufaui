import { CDefaultType } from "@agufaui/config";
import type { IAButtonProps } from "../types/AButton";

export const DAButton: Readonly<Record<string, IAButtonProps>> = {
  [CDefaultType]: {
    aclass: "px-4 py-2 text-sm rounded-md",
    ipos: "left",
    spacex: "space-x-1.5",
  },
};
