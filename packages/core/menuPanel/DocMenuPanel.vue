<!-- #region showcase -->
<template>
	<div class="flex items-center flex-wrap gap-2 doc">
		<ampanel :links="links" t="flyout" c="dark:bg-white w-14em" vc="dark:text-gray-900" />
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuPanel",
};
</script>

<script setup lang="ts">
const links = [
	{
		v: "Google",
		href: "https://google.com",
		i: "i-logos:google-icon",
		subtitle: "Google Site",
	},
	{
		v: "Github",
		href: "https://github.com",
		i: "i-logos:github-icon",
		subtitle: "Github Site",
	},
];
</script>
<!-- #endregion showcase -->
