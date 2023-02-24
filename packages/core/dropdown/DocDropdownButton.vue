<template>
	<div class="flex items-start justify-end flex-wrap gap-8 h-7rem">
		<!-- #region showcase -->
		<adropdownbutton :items="items"> </adropdownbutton>
		<adropdownbutton :items="items" :disabled="true"> </adropdownbutton>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	href: "DocDropdownButton",
};
</script>

<script setup lang="ts">
import type { TDropdownButtonItem } from "@agufaui/theme";

const items: TDropdownButtonItem[] = [
	{
		icon: "i-ic:outline-edit",
		display: "Edit",
		event: "edit",
	},
	{
		icon: "i-material-symbols:delete-outline",
		display: "Delete",
		event: "delete",
	},
	{
		icon: "i-material-symbols:save-as-outline",
		display: "Save",
		event: "save",
	},
];
</script>
