<!-- #region showcase -->
<template>
	<div class="flex items-start flex-wrap gap-x-3 gap-y-2 doc">
		<amitem :v="dropdown" />
		<amitem :v="link" />
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuItem",
};
</script>

<script setup lang="ts">
import type { TAMItem } from "@agufaui/theme";

const dropdown: TAMItem = {
	name: "dropdown",
	props: {
		v: "Sites",
		i: "i-majesticons:sitemap",
		items: [
			{
				name: "link",
				props: {
					v: "Google",
					vc: "dark:text-white",
					href: "https://google.com",
					badges: [{ v: "Alpha", t: "round", c: "bg-red" }],
				},
			},
			{
				name: "link",
				props: {
					v: "Github",
					vc: "dark:text-white",
					href: "https://github.com",
				},
			},
		],
		badges: [
			{ v: "Beta", t: "round", c: "bg-blue" },
			{ v: "New", t: "round", c: "bg-lime" },
		],
		c: "w-12em",
		titlesc: "hover:text-gray-5 dark:text-white dark:hover:text-gray-3",
	},
};

const link: TAMItem = {
	name: "link",
	props: {
		href: "https://vuejs.org",
		i: "i-vscode-icons:file-type-vue",
		ic: "text-2xl",
		c: "hover:-translate-px active:translate-px",
	},
	attrs: {
		target: "_blank",
		rel: "noreferrer noopener",
		title: "vue",
	},
};
</script>
<!-- #endregion showcase -->
