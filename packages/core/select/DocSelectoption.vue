<template>
	<div class="flex justify-start flex-wrap flex-col space-y-4">
		<!-- #region showcase -->
		<aselectoption :v="selected" :options="options" vc="w-15rem" @select="selected = $event">
		</aselectoption>
		<aselectoption :v="selected1" nolabel :options="options" @select="selected1 = $event">
		</aselectoption>
		<aselectoption :v="selected2" :options="options" :disabled="true"> </aselectoption>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocSelectoption",
};
</script>

<script setup lang="ts">
import type { TSelectOption } from "@agufaui/theme";

let selected = ref<string | number>("");
let selected1 = ref<string | number>("");
let selected2 = ref<string | number>("");

const options: TSelectOption[] = [
	{
		id: "US",
		name: "United States",
	},
	{
		id: "CA",
		name: "Canada",
	},
];
</script>
