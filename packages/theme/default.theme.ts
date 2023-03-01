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
import { DADropdownSelect } from "./default/basic/ADropdown";
import { DADropdownDeco } from "./default/basic/ADropdown";
import { DADropdownControl } from "./default/basic/ADropdown";
import { DASelect } from "./default/basic/ASelect";
import { DASelectoption } from "./default/basic/ASelect";
import { DASearch } from "./default/basic/ASearch";
import { DALabel } from "./default/basic/ALabel";
import { DATooltip } from "./default/basic/ATooltip";
import { DATextarea } from "./default/basic/ATextarea";
import { DAModal } from "./default/basic/AModal";
import { DADrawer } from "./default/basic/ADrawer";
//utility
import { DAAlertError } from "./default/utility/AAlertError";
import { DARating } from "./default/utility/ARating";
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
// Table
import { DAPagination } from "./default/table/APagination";
import { DATpanel } from "./default/table/ATpanel";
import { DATable } from "./default/table/ATable";

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
export const CASelectoptionName = "aselectoption";
export const CADropdownName = "adropdown";
export const CADropdownButtonName = "adropdownbutton";
export const CADropdownSelectName = "adropdownselect";
export const CADropdownDecoName = "adropdowndeco";
export const CADropdownControlName = "adropdowncontrol";
export const CASearchName = "asearch";
export const CALabelName = "alabel";
export const CATooltipName = "atooltip";
export const CATextareaName = "atextarea";
export const CAModalName = "amodal";
export const CADrawerName = "adrawer";
//utility
export const CAAlertErrorName = "aalertError";
export const CARatingName = "arating";
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
// Table
export const CAPaginationName = "apagination";
export const CATpanelName = "atpanel";
export const CATableName = "atable";

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
	[CASelectoptionName]: DASelectoption,
	[CADropdownName]: DADropdown,
	[CADropdownButtonName]: DADropdownButton,
	[CADropdownSelectName]: DADropdownSelect,
	[CADropdownDecoName]: DADropdownDeco,
	[CADropdownControlName]: DADropdownControl,
	[CASearchName]: DASearch,
	[CALabelName]: DALabel,
	[CATooltipName]: DATooltip,
	[CATextareaName]: DATextarea,
	[CAModalName]: DAModal,
	[CADrawerName]: DADrawer,
	//utility
	[CAAlertErrorName]: DAAlertError,
	[CARatingName]: DARating,
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
	// Table
	[CAPaginationName]: DAPagination,
	[CATpanelName]: DATpanel,
	[CATableName]: DATable,
};
