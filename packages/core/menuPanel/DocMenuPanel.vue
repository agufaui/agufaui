<!-- #region showcase -->
<template>
	<div class="flex items-center flex-wrap gap-2 doc">
		<ampanel :links="links" t="flyout" c="dark:bg-white" titlec="dark:text-gray-900" />
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
		title: "Google",
		href: "https://google.com",
		icon: "i-logos:google-icon",
		subtitle: "Google Site",
	},
	{
		title: "Github",
		href: "https://github.com",
		icon: "i-logos:github-icon",
		subtitle: "Github Site",
	},
];
</script>
<!-- #endregion showcase -->
