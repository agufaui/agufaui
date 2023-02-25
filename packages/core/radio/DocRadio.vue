<template>
	<div class="flex items-center flex-wrap gap-8">
		<!-- #region showcase -->
		<aradio :v="selected" label="country" :options="options" @select="assign(selected, $event)">
		</aradio>
		<aradio
			:v="selected1"
			label="country"
			t="green"
			:options="options"
			@select="assign(selected1, $event)"
		>
		</aradio>
		<aradio :v="selected2" label="disabled" :options="options" :disabled="true"> </aradio>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocRadio",
};
</script>

<script setup lang="ts">
import type { TRadioOption } from "@agufaui/theme";

let selected = reactive<TRadioOption>({ id: "", name: "" });
let selected1 = reactive<TRadioOption>({ id: "", name: "" });
let selected2 = reactive<TRadioOption>({ id: "", name: "" });

const options: TRadioOption[] = [
	{
		id: "US",
		name: "United States",
	},
	{
		id: "CA",
		name: "Canada",
	},
];

const assign = (obj: TRadioOption, updateObj: TRadioOption) => {
	Object.assign(obj, updateObj);
};
</script>
