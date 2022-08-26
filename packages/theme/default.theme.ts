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
import { DAMtoggle } from "./default/AMtoggle";
import { DAMpanel } from "./default/AMpanel";
import { DAMflyout } from "./default/AMflyout";
import { DAMdropdown } from "./default/AMdropdown";
import { DAMsidebar } from "./default/AMsidebar";
import { DAMmsidebar } from "./default/AMmsidebar";

export const CAButtonName = "abutton";
export const CAAlertName = "aalert";
export const CAAlertErrorName = "aalertError";
export const CAInputName = "ainput";
export const CAAName = "aa";
export const CABadgeName = "abadge";
export const CATagName = "atag";
export const CASupName = "asup";
export const CASubName = "asub";
export const CAMtoggleName = "amtoggle";
export const CAMpanelName = "ampanel";
export const CAMflyoutName = "amflyout";
export const CAMdropdownName = "amdropdown";
export const CAMsidebarName = "amsidebar";
export const CAMmsidebarName = "ammsidebar";

export const Theme: ITheme = {
	[CAButtonName]: DAButton,
	[CAAlertName]: DAAlert,
	[CAAlertErrorName]: DAAlertError,
	[CAInputName]: DAInput,
	[CAAName]: DAA,
	[CABadgeName]: DABadge,
	[CATagName]: DATag,
	[CASupName]: DASup,
	[CASubName]: DASub,
	[CAMtoggleName]: DAMtoggle,
	[CAMpanelName]: DAMpanel,
	[CAMflyoutName]: DAMflyout,
	[CAMdropdownName]: DAMdropdown,
	[CAMsidebarName]: DAMsidebar,
	[CAMmsidebarName]: DAMmsidebar,
};
