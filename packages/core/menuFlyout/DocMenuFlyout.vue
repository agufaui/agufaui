<!-- #region showcase -->
<template>
	<div class="flex items-start flex-wrap gap-2 h-16rem doc">
		<amflyout v="Sites" :links="links" vc="dark:text-white dark:hover:text-gray-900" />
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuFlyout",
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
