import { ITheme } from "@agufaui/config";
import { DAAlert } from "./default/basic/AAlert";
import { DAButton } from "./default/basic/AButton";
import { DAInput } from "./default/basic/AInput";
import { DAA } from "./default/basic/AA";
import { DABadge } from "./default/basic/ABadge";
import { DATag } from "./default/basic/ATag";
import { DASup } from "./default/basic/ASup";
import { DASub } from "./default/basic/ASub";
import { DAToggle } from "./default/basic/AToggle";
import { DACheckbox } from "./default/basic/ACheckbox";
import { DARadio } from "./default/basic/ARadio";
import { DADropdown } from "./default/basic/ADropdown";
import { DADropdownButton } from "./default/basic/ADropdown";
import { DASelect } from "./default/basic/ASelect";
import { DASearch } from "./default/basic/ASearch";
import { DALabel } from "./default/basic/ALabel";
import { DATooltip } from "./default/basic/ATooltip";
import { DATextarea } from "./default/basic/ATextarea";
import { DAModal } from "./default/basic/AModal";
//utility
import { DAAlertError } from "./default/utility/AAlertError";
// Navigation
import { DAMtoggle } from "./default/navigation/AMtoggle";
import { DAMlink } from "./default/navigation/AMlink";
import { DAMitem } from "./default/navigation/AMitem";
import { DAMpanel } from "./default/navigation/AMpanel";
import { DAMflyout } from "./default/navigation/AMflyout";
import { DAMdropdown } from "./default/navigation/AMdropdown";
import { DAMsidebar } from "./default/navigation/AMsidebar";
import { DAMmsidebar } from "./default/navigation/AMmsidebar";
// Form
import { DASd } from "./default/form/ASd";

export const CAButtonName = "abutton";
export const CAAlertName = "aalert";
export const CAInputName = "ainput";
export const CAAName = "aa";
export const CABadgeName = "abadge";
export const CATagName = "atag";
export const CASupName = "asup";
export const CASubName = "asub";
export const CAToggleName = "atoggle";
export const CACheckboxName = "acheckbox";
export const CARadioName = "aradio";
export const CASelectName = "aselect";
export const CADropdownName = "adropdown";
export const CADropdownButtonName = "adropdownbutton";
export const CASearchName = "asearch";
export const CALabelName = "alabel";
export const CATooltipName = "atooltip";
export const CATextareaName = "atextarea";
export const CAModalName = "amodal";
//utility
export const CAAlertErrorName = "aalertError";
// Navigation
export const CAMtoggleName = "amtoggle";
export const CAMlinkName = "amlink";
export const CAMitemName = "amitem";
export const CAMpanelName = "ampanel";
export const CAMflyoutName = "amflyout";
export const CAMdropdownName = "amdropdown";
export const CAMsidebarName = "amsidebar";
export const CAMmsidebarName = "ammsidebar";
// Form
export const CASdName = "asd";

export const Theme: ITheme = {
	[CAButtonName]: DAButton,
	[CAAlertName]: DAAlert,
	[CAInputName]: DAInput,
	[CAAName]: DAA,
	[CABadgeName]: DABadge,
	[CATagName]: DATag,
	[CASupName]: DASup,
	[CASubName]: DASub,
	[CAToggleName]: DAToggle,
	[CACheckboxName]: DACheckbox,
	[CARadioName]: DARadio,
	[CASelectName]: DASelect,
	[CADropdownName]: DADropdown,
	[CADropdownButtonName]: DADropdownButton,
	[CASearchName]: DASearch,
	[CALabelName]: DALabel,
	[CATooltipName]: DATooltip,
	[CATextareaName]: DATextarea,
	[CAModalName]: DAModal,
	//utility
	[CAAlertErrorName]: DAAlertError,
	// Navigation
	[CAMtoggleName]: DAMtoggle,
	[CAMlinkName]: DAMlink,
	[CAMitemName]: DAMitem,
	[CAMpanelName]: DAMpanel,
	[CAMflyoutName]: DAMflyout,
	[CAMdropdownName]: DAMdropdown,
	[CAMsidebarName]: DAMsidebar,
	[CAMmsidebarName]: DAMmsidebar,
	// Form
	[CASdName]: DASd,
};
