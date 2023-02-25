<template>
	<div class="flex items-center flex-wrap gap-8">
		<!-- #region showcase -->
		<aselect
			:v="selected"
			label="country"
			:fullwidth="true"
			:options="options"
			@select="assign(selected, $event)"
		>
		</aselect>
		<aselect
			:v="selected1"
			label="country"
			t="green"
			:fullwidth="true"
			:options="options"
			@select="assign(selected1, $event)"
		>
		</aselect>
		<aselect :v="selected2" label="disabled" :fullwidth="true" :options="options" :disabled="true">
		</aselect>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocSelect",
};
</script>

<script setup lang="ts">
import type { TSelectOption } from "@agufaui/theme";

let selected = reactive<TSelectOption>({ id: "", name: "" });
let selected1 = reactive<TSelectOption>({ id: "", name: "" });
let selected2 = reactive<TSelectOption>({ id: "", name: "" });

const options: TSelectOption[] = [
	{
		id: "US",
		name: "United States",
		display: "United States",
	},
	{
		id: "CA",
		name: "Canada",
	},
];

const assign = (obj: TSelectOption, updateObj: TSelectOption) => {
	Object.assign(obj, updateObj);
	if (!updateObj.display) {
		delete obj.display;
	}
};
</script>
