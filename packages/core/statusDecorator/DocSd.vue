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
		<asd vasd="button" dirasd="button" :propsasd="propsButton" :alerterrorasd="alertErrorSuccess" />
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
	c: "py-2",
	show: true,
};
let alertError: IAAlertErrorProps = {
	v: "Must be at least 8 characters",
	show: true,
	error: true,
};

let propsButton = reactive<IAButtonProps>({
	v: "Submit",
	t: "focusblock",
	c: "text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5",
});
let alertErrorSuccess: IAAlertErrorProps = {
	v: "Success",
	show: true,
};

function notify(e: string) {
	props.v = e;
	console.log(props.v);
}
</script>
<!-- #endregion showcase -->
