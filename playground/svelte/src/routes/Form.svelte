<script lang="ts">
	import { Asd } from "@agufaui/svelte";
	import type { IAInputProps, IALabelProps, IAAlertProps, IAAlertErrorProps } from "@agufaui/theme";

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

	function notify(e: string) {
		props.v = e;
		console.log(props.v);
	}
</script>

<Asd
	labelasd={label}
	vasd="input"
	t="grid4"
	dirasd="input"
	propsasd={props}
	alertasd={alert}
	alerterrorasd={alertError}
	on:update:v={(e) => notify(e)}
/>
