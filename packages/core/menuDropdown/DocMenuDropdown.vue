<!-- #region showcase -->
<template>
	<div class="flex items-start flex-wrap gap-2 h-16rem doc">
		<amdropdown
			v="Sites"
			i="i-majesticons:sitemap"
			:links="links"
			c="w-12em"
			titlesc="dark:text-white dark:hover:text-gray-300"
			linksc="dark:bg-white"
			mpanelt="flyout"
		/>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuDropdown",
};
</script>

<script setup lang="ts">
const links = [
	{
		v: "Google",
		vc: "dark:text-gray-900",
		href: "https://google.com",
		i: "i-logos:google-icon",
		subtitle: "Google Site",
	},
	{
		v: "Github",
		vc: "dark:text-gray-900",
		href: "https://github.com",
		i: "i-logos:github-icon",
		subtitle: "Github Site",
	},
];
</script>
<!-- #endregion showcase -->
