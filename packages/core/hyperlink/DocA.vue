<template>
	<div class="flex items-center flex-wrap gap-x-3 gap-y-2">
		<!-- #region showcase -->
		<aa
			v="Link"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="!text-blue hover:-translate-px active:translate-px focus:(ring-offset-none ring-none)"
		/>
		<aa
			v="Link"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="!text-blue-5 !hover:text-green-5 active:!text-purple-5 focus:!text-purple-5"
		/>
		<aa
			target="_blank"
			href="https://github.com"
			rel="noreferrer noopener"
			title="github"
			i="i-mdi:github"
			ic="text-2xl"
			c="!text-blue-5 !hover:text-green-5 active:!text-purple-5 focus:!text-purple-5"
		/>
		<aa
			target="_blank"
			href="https://vuejs.org"
			rel="noreferrer noopener"
			title="vue"
			i="i-vscode-icons:file-type-vue"
			ic="text-2xl"
			c="hover:-translate-px active:translate-px"
		/>
		<aa
			target="_blank"
			href="https://svelte.dev/"
			rel="noreferrer noopener"
			title="svelte"
			i="i-vscode-icons:file-type-svelte"
			ic="text-2xl"
			c="shadow-md hover:shadow-red active:shadow-purple focus:shadow-purple"
		/>
		<aa
			v="Link"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-logos:google-admob"
			spacex="space-x-1.2"
			c="px-0.5 !text-4 !text-green-5 shadow-sm hover:shadow-green-5 active:shadow-purple focus:shadow-green-6"
		/>
		<aa
			v="Link"
			t="button"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="!text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
		/>
		<aa
			v="Link"
			t="buttonfocus"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			:tabindex="2"
			i="i-ph-anchor"
			ic="group-hover:animate-head-shake"
			c="group !text-white  bg-gradient-to-br from-green-2 to-green-6 hover:via-green-6 !focus:(via-green-7 ring-green-5)"
		/>
		<aa
			v="Link"
			t="buttonfocus"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			:loading="true"
			loadc="text-lg"
			c="!text-white bg-amber-6 hover:bg-amber-7 focus:ring-amber-5"
		/>
		<aa
			v="Upload"
			t="buttonfocus"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-material-symbols:upload-rounded"
			ipos="right"
			ic="text-lg group-hover:animate-rubber-band"
			c="group !text-white bg-lime-6 hover:bg-lime-7 focus:ring-lime-5"
		/>
		<aa
			v="Link"
			t="buttonfocus"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			vc="group-hover:animate-jello"
			c="group !text-indigo-5 border border-indigo-4 hover:bg-indigo-2 focus:ring-indigo-2"
		/>
		<aa
			v="Link"
			t="buttonfocus"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			vc="group-hover:animate-tada"
			c="group text--1.5 !text-purple-5 hover:bg-purple-2 focus:ring-purple-2"
		/>
		<aa
			t="buttonfocus"
			i="i-material-symbols:edit-document-outline"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			ic="group-hover:animate-jack-in-the-box"
			c="group !text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5"
			aria-label="Edit"
		/>
		<aa
			v="Circle"
			t="buttoncircle"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="h-2.5rem text-xs !text-white bg-gradient-to-r from-purple-3 to-pink-6 disabled:opacity-50 hover:bg-red-6/80 hover:animate-swing focus:(to-red-4 ring-red-3)"
		/>
		<aa
			t="buttoncircle"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-ri:delete-bin-6-line"
			ic="text-lg group-hover:animate-bounce-in"
			c="h-2.5rem group !text-white bg-orange-6 hover:bg-orange-7 focus:ring-orange-5"
			aria-label="Delete"
		/>
		<aa
			t="buttoncircle"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			:loading="true"
			loadc="text-lg"
			c="h-2.5rem !text-white bg-teal-6 hover:bg-teal-7 focus:ring-teal-5"
			aria-label="Loading"
		/>
		<aa
			t="buttoncircle"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-ri:search-line"
			ic="text-lg group-hover:animate-heart-beat"
			c="h-2.5rem group !text-gray-4 border border-gray-3 hover:bg-gray-2 focus:ring-gray-3"
			aria-label="Search"
		/>
		<aa
			t="button"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-material-symbols:download-rounded"
			ic="group-hover:animate-bounce"
			c="group !text-cyan-5 border border-cyan-4 hover:bg-cyan-2 focus:ring-cyan-2"
			aria-label="Download"
		/>
		<aa
			t="buttoncircle"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			i="i-ic:outline-email"
			ic="text-xl group-hover:animate-wobble"
			c="group h-2.5rem !text-violet-4 hover:bg-violet-2 focus:ring-violet-2"
			aria-label="Email"
		/>
		<aa
			v="Link"
			t="buttonfocusblock"
			target="_blank"
			href="https://www.google.com"
			rel="noreferrer noopener"
			title="Google"
			c="!text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5"
		/>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocA",
};
</script>
