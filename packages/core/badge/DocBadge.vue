<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<abadge v="github" t="rec" c="text-white bg-black" />
		<abadge v="vue" t="rec" c="text-white bg-gradient-to-br from-blue-2 to-green-5" />
		<abadge v="svelte" t="rec" c="text-white bg-red-5" />
		<abadge
			v="github"
			t="round"
			c="text-white bg-gradient-to-br from-purple-2 to-black shadow-md shadow-gray-4"
		/>
		<abadge
			v="vue"
			t="round"
			c="text-white bg-gradient-to-br from-blue-2 to-green-5 shadow-md shadow-green-3"
		/>
		<abadge
			v="svelte"
			t="round"
			c="text-white bg-gradient-to-br from-purple-2 to-red-5 shadow-md shadow-red-3"
		/>
		<abadge i="i-mdi:github" t="icon" />
		<abadge i="i-vscode-icons:file-type-vue" t="icon" />
		<abadge i="i-vscode-icons:file-type-svelte" t="icon" />
		<abadge i="i-ri:github-line" t="circle" c="text-white bg-black" />
		<abadge i="i-uim:vuejs" t="circle" c="text-white bg-gradient-to-br from-blue-2 to-green-5" />
		<abadge i="i-teenyicons:svelte-outline" t="circle" c="text-white bg-red-5" />
		<abutton v="Button" t="focus" c="bg-green-6 hover:bg-green-7 focus:ring-green-5 space-x-1">
			<span class="text-white">Button</span>
			<abadge v="4" vc="bg-white px-0.8 rounded-sm shadow-md" c="flex" />
		</abutton>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocBadge",
};
</script>
