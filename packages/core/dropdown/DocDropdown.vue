<template>
	<div class="flex items-start justify-end flex-wrap gap-8 h-7rem">
		<!-- #region showcase -->
		<adropdown v="options" :items="items"> </adropdown>
		<adropdown v="options" t="hovertext" :items="items"> </adropdown>
		<adropdown v="disabled" :items="items" :disabled="true"> </adropdown>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	href: "DocDropdown",
};
</script>

<script setup lang="ts">
import type { TDropdownItem } from "@agufaui/theme";

const items: TDropdownItem[] = [
	{
		label: "Google",
		href: "https://google.com",
	},
	{
		label: "Github",
		href: "https://github.com",
	},
];
</script>
