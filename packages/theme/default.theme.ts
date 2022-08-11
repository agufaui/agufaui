import { ITheme } from "@agufaui/config";
import { DAAlert } from "./default/AAlert";
import { DAAlertError } from "./default/AAlertError";
import { DAButton } from "./default/AButton";

export const CAButtonName = "abutton";
export const CAAlertName = "aalert";
export const CAAlertErrorName = "aalertError";

export const Theme: ITheme = {
	[CAButtonName]: DAButton,
	[CAAlertName]: DAAlert,
	[CAAlertErrorName]: DAAlertError,
};
