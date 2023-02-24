<template>
	<div class="flex items-center flex-wrap gap-x-3 gap-y-2 doc">
		<!-- #region showcase -->
		<amlink
			v="Link"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="!text-blue hover:-translate-px active:translate-px"
		/>
		<amlink
			v="Link"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="!text-blue-5 !hover:text-green-5 active:!text-purple-5 focus:!text-purple-5"
		/>
		<amlink
			target="_blank"
			href="https://github.com"
			rel="noreferrer noopener"
			title="github"
			i="i-mdi:github"
			ic="text-2xl"
			c="!text-blue-5 !hover:text-green-5 active:!text-purple-5 focus:!text-purple-5"
		/>
		<amlink
			target="_blank"
			href="https://vuejs.org"
			rel="noreferrer noopener"
			title="vue"
			i="i-vscode-icons:file-type-vue"
			ic="text-2xl"
			c="hover:-translate-px active:translate-px"
		/>
		<amlink
			target="_blank"
			href="https://svelte.dev/"
			rel="noreferrer noopener"
			title="svelte"
			i="i-vscode-icons:file-type-svelte"
			ic="text-2xl"
			c="p-1 shadow-sm hover:shadow-red active:shadow-purple focus:shadow-purple"
		/>
		<amlink
			v="Google"
			subtitle="open google site"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-logos:google-admob"
		/>
		<amlink
			v="Google"
			subtitle="open google site"
			subtitlec="text-indigo-4 hover:text-indigo-6"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-logos:google-admob"
			:badges="[
				{
					v: 'Beta',
					t: 'round',
					c: 'bg-green-3',
				},
			]"
			c="p-1 !text-green-5 shadow-sm hover:shadow-green-5 active:shadow-purple focus:shadow-green-6"
		/>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuLink",
};
</script>
