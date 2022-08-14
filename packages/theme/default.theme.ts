import { ITheme } from "@agufaui/config";
import { DAAlert } from "./default/AAlert";
import { DAAlertError } from "./default/AAlertError";
import { DAButton } from "./default/AButton";
import { DAInput } from "./default/AInput";

export const CAButtonName = "abutton";
export const CAAlertName = "aalert";
export const CAAlertErrorName = "aalertError";
export const CAInputName = "ainput";

export const Theme: ITheme = {
	[CAButtonName]: DAButton,
	[CAAlertName]: DAAlert,
	[CAAlertErrorName]: DAAlertError,
	[CAInputName]: DAInput,
};
