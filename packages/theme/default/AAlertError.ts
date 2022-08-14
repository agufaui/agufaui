import { CDefaultType } from "@agufaui/config";
import type { IAAlertErrorProps } from "../types/AAlertError";

export const DAAlertError: Readonly<Record<string, IAAlertErrorProps>> = {
	[CDefaultType]: {
		errorAAlertType: "red",
		successAAlertType: "green",
	},
};
