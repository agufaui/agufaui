<template>
	<div class="flex items-start justify-end flex-wrap gap-8 h-9rem">
		<!-- #region showcase -->
		<adropdownselect :items="items"> </adropdownselect>
		<adropdownselect :items="items" :disabled="true"> </adropdownselect>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	href: "DocDropdownSelect",
};
</script>

<script setup lang="ts">
import type { TDropdownSelectItem, IADropdownDecoProps } from "@agufaui/theme";

const items: TDropdownSelectItem[] = [
	{
		key: "id",
		value: "id",
	},
	{
		key: "name",
		value: "name",
	},
];
</script>
