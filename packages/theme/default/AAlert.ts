import { CDefaultType } from "@agufaui/config";
import type { IAAlertProps } from "../types/AAlert";

export const DAAlert: Readonly<Record<string, IAAlertProps>> = {
  [CDefaultType]: {
    show: true,
    icon: "i-heroicons-solid:information-circle",
    iclass: "text-blue-600 mt-0.4",
    ipos: "left",
    mclass: "text-gray-600 text-sm font-medium max-w-sm",
    spacex: "space-x-1.2",
  },
  red: {
    show: true,
    icon: "i-majesticons:exclamation-circle",
    aclass: "rounded-md bg-red-50 p-4",
    iclass: "text-red-400 mt-0.4",
    ipos: "left",
    mclass: "text-red-600 text-sm font-medium w-full",
    spacex: "space-x-1.5",
  },
  green: {
    show: true,
    icon: "i-material-symbols:check-circle",
    aclass: "rounded-md bg-green-50 p-4",
    iclass: "text-green-400 mt-0.4",
    ipos: "left",
    mclass: "text-green-600 text-sm font-medium w-full",
    spacex: "space-x-1.5",
  },
  yellow: {
    show: true,
    icon: "i-ic:outline-warning",
    aclass: "rounded-md bg-yellow-50 p-4",
    iclass: "text-yellow-400 mt-0.4",
    ipos: "left",
    mclass: "text-yellow-600 text-sm font-medium w-full",
    spacex: "space-x-1.5",
  },
  gray: {
    show: true,
    icon: "i-heroicons-solid:information-circle",
    aclass: "rounded-md bg-gray-50 p-4",
    iclass: "text-blue-400 mt-0.4",
    ipos: "left",
    mclass: "text-gray-600 text-sm font-medium w-full",
    spacex: "space-x-1.5",
  },
  blue: {
    show: true,
    icon: "i-heroicons-solid:information-circle",
    aclass: "rounded-md bg-blue-50 p-4",
    iclass: "text-blue-400 mt-0.4",
    ipos: "left",
    mclass: "text-gray-600 text-sm font-medium w-full",
    spacex: "space-x-1.5",
  },
};
