import { CDefaultType } from "@agufaui/config";
import type { IAAlertProps } from "../types/AAlert";

export const DAAlertDefault = {
	icon: "i-heroicons-solid:information-circle",
	iclass: "text-blue-6 mt-0.4",
	mclass: "text-gray-6 text-sm font-medium max-w-sm",
};

export const DAAlertClclass = "text-xs text-gray-4 hover:text-gray-6 mt-1";

export const DAAlertRed = {
	icon: "i-majesticons:exclamation-circle",
	aclass: "rounded-md bg-red-50 p-4",
	iclass: "text-red-4 mt-0.4",
	mclass: "text-red-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	clclass: DAAlertClclass,
};

export const DAAlertGreen = {
	icon: "i-material-symbols:check-circle",
	aclass: "rounded-md bg-green-50 p-4",
	iclass: "text-green-4 mt-0.4",
	mclass: "text-green-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	clclass: DAAlertClclass,
};

export const DAAlertYellow = {
	icon: "i-ic:outline-warning",
	aclass: "rounded-md bg-yellow-50 p-4",
	iclass: "text-yellow-4 mt-0.4",
	mclass: "text-yellow-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	clclass: DAAlertClclass,
};

export const DAAlertGray = {
	icon: "i-heroicons-solid:information-circle",
	aclass: "rounded-md bg-gray-50 p-4",
	iclass: "text-blue-4 mt-0.4",
	mclass: "text-gray-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	clclass: DAAlertClclass,
};

export const DAAlertBlue = {
	icon: "i-heroicons-solid:information-circle",
	aclass: "rounded-md bg-blue-50 p-4",
	iclass: "text-blue-4 mt-0.4",
	mclass: "text-gray-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	clclass: DAAlertClclass,
};

export const DAAlert: Readonly<Record<string, IAAlertProps>> = {
	[CDefaultType]: DAAlertDefault,
	red: DAAlertRed,
	green: DAAlertGreen,
	yellow: DAAlertYellow,
	gray: DAAlertGray,
	blue: DAAlertBlue,
};
