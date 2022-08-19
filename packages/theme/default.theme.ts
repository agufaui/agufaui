import type { TComponent } from "@agufaui/config";
import { ITheme } from "@agufaui/config";
import { DAAlert } from "./default/AAlert";
import { DAAlertError } from "./default/AAlertError";
import { DAButton } from "./default/AButton";
import { DAInput } from "./default/AInput";
import { DAA } from "./default/AA";
import { DABadge } from "./default/ABadge";
import { DATag } from "./default/ATag";
import { DASup } from "./default/ASup";
import { DASub } from "./default/ASub";
import { DAMobile } from "./default/AMobile";

export const CAButtonName = "abutton";
export const CAAlertName = "aalert";
export const CAAlertErrorName = "aalertError";
export const CAInputName = "ainput";
export const CAAName = "aa";
export const CABadgeName = "abadge";
export const CATagName = "atag";
export const CASupName = "asup";
export const CASubName = "asub";
export const CAMobileName = "amobile";

export const Theme: ITheme = {
	[CAButtonName]: DAButton as TComponent,
	[CAAlertName]: DAAlert as TComponent,
	[CAAlertErrorName]: DAAlertError as TComponent,
	[CAInputName]: DAInput as TComponent,
	[CAAName]: DAA as TComponent,
	[CABadgeName]: DABadge as TComponent,
	[CATagName]: DATag as TComponent,
	[CASupName]: DASup as TComponent,
	[CASubName]: DASub as TComponent,
	[CAMobileName]: DAMobile as TComponent,
};
