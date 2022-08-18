import { CDefaultType } from "@agufaui/config";
import type { IAAlertProps } from "../types/AAlert";

export const DAAlertDefault = {
	i: "i-heroicons-solid:information-circle",
	ic: "text-blue-6 mt-0.4",
	vc: "text-gray-6 text-sm font-medium max-w-sm",
};

export const DAAlertClclass = "text-xs text-gray-4 hover:text-gray-6 mt-1";

export const DAAlertRed = {
	i: "i-majesticons:exclamation-circle",
	c: "rounded-md bg-red-50 p-4",
	ic: "text-red-4 mt-0.4",
	vc: "text-red-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	closec: DAAlertClclass,
};

export const DAAlertGreen = {
	i: "i-material-symbols:check-circle",
	c: "rounded-md bg-green-50 p-4",
	ic: "text-green-4 mt-0.4",
	vc: "text-green-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	closec: DAAlertClclass,
};

export const DAAlertYellow = {
	i: "i-ic:outline-warning",
	c: "rounded-md bg-yellow-50 p-4",
	ic: "text-yellow-4 mt-0.4",
	vc: "text-yellow-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	closec: DAAlertClclass,
};

export const DAAlertGray = {
	i: "i-heroicons-solid:information-circle",
	c: "rounded-md bg-gray-50 p-4",
	ic: "text-blue-4 mt-0.4",
	vc: "text-gray-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	closec: DAAlertClclass,
};

export const DAAlertBlue = {
	i: "i-heroicons-solid:information-circle",
	c: "rounded-md bg-blue-50 p-4",
	ic: "text-blue-4 mt-0.4",
	vc: "text-gray-6 text-sm font-medium w-full",
	spacex: "space-x-1.5",
	closec: DAAlertClclass,
};

export const DAAlert: Readonly<Record<string, IAAlertProps>> = {
	[CDefaultType]: DAAlertDefault,
	red: DAAlertRed,
	green: DAAlertGreen,
	yellow: DAAlertYellow,
	gray: DAAlertGray,
	blue: DAAlertBlue,
};
