<!-- #region showcase -->
<template>
	<div class="flex flex-col gap-y-4">
		<asd
			:labelasd="label"
			vasd="input"
			t="grid4"
			dirasd="input"
			:propsasd="props"
			:alertasd="alert"
			:alerterrorasd="alertError"
			@update:v="notify($event)"
		/>
		<asd
			:labelasd="labelPre"
			:prependasd="badgePre"
			vasd="input"
			t="grid4"
			dirasd="input"
			:propsasd="propsPre"
		/>
		<asd
			:labelasd="labelPost"
			:postpendasd="badgePost"
			vasd="select"
			t="grid4"
			dirasd="select"
			:propsasd="select"
			@select="assign(select.v, $event)"
		/>
		<asd
			:labelasd="labelUp"
			uplabelasd
			vasd="input"
			t="grid4"
			dirasd="input"
			:propsasd="props"
			:alertasd="alert"
			:alerterrorasd="alertError"
			@update:v="notify($event)"
		/>
		<asd vasd="button" dirasd="button" :propsasd="propsButton" :alerterrorasd="alertErrorSuccess" />
		<asd vasd="button" dirasd="button" :propsasd="propsSlot" :alerterrorasd="alertErrorSuccess">
			<template #msg>
				<span>Submitted</span>
			</template>
		</asd>
		<b>Responsive</b>
		<asd
			:labelasd="labelRes"
			vasd="input"
			t="resgrid4"
			dirasd="input"
			:propsasd="props"
			:alertasd="alert"
			:alerterrorasd="alertError"
			@update:v="notify($event)"
		/>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocSd",
};
</script>

<script setup lang="ts">
import type {
	IAInputProps,
	IAButtonProps,
	IALabelProps,
	IAAlertProps,
	IAAlertErrorProps,
	IABadgeProps,
	IASelectProps,
	TSelectOption,
} from "@agufaui/theme";

let label: IALabelProps = {
	v: "Username",
	c: "pr-2",
	required: true,
	right: true,
	tooltip: { v: "user name" },
};

let props: IAInputProps = {
	v: "",
	vc: "w-full",
};

let alert: IAAlertProps = {
	v: "Can't contain special characters",
	show: true,
};

let alertError: IAAlertErrorProps = {
	v: "Must be at least 8 characters",
	show: true,
	error: true,
};

let labelPre: IALabelProps = {
	v: "Url",
	c: "pr-2",
	required: true,
	right: true,
	tooltip: { v: "url" },
};

let propsPre: IAInputProps = {
	v: "",
	vc: "w-full !rounded-none !rounded-r-lg",
};

let badgePre: IABadgeProps = {
	v: "http://",
	t: "pre",
};

let labelPost: IALabelProps = {
	v: "Weight",
	c: "pr-2",
	required: true,
	right: true,
	tooltip: { v: "weight" },
};

const options: TSelectOption[] = [
	{
		id: "50",
		name: "50",
	},
	{
		id: "100",
		name: "100",
	},
	{
		id: "200",
		name: "200",
	},
];

let select: IASelectProps = {
	v: { id: "", name: "" },
	options: options,
	fullwidth: true,
	c: "!w-5rem",
	buttonc: "!rounded-none !rounded-l-lg",
};

let badgePost: IABadgeProps = {
	v: "kg",
	t: "post",
	c: "mb-0.6",
};

let labelUp: IALabelProps = {
	v: "Username",
	c: "pr-2",
	required: true,
	tooltip: { v: "user name" },
};

let propsButton = reactive<IAButtonProps>({
	v: "Submit",
	t: "focusblock",
	c: "text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5",
});
let alertErrorSuccess: IAAlertErrorProps = {
	v: "Success",
	show: true,
	c: "w-full",
};

let propsSlot = reactive<IAButtonProps>({
	v: "Slot",
	t: "focusblock",
	c: "text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5",
});

let labelRes: IALabelProps = {
	v: "Username",
	c: "pr-2",
	required: true,
	tooltip: { v: "user name" },
};

function notify(e: string) {
	props.v = e;
	console.log(props.v);
}

const assign = (obj: TSelectOption, updateObj: TSelectOption) => {
	Object.assign(obj, updateObj);
	if (!updateObj.display) {
		delete obj.display;
	}
};
</script>
<!-- #endregion showcase -->
