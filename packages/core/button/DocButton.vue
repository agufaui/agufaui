<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<abutton
			v="Button"
			c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
		/>
		<abutton
			v="Button"
			t="focus"
			i="i-ph-anchor"
			ic="group-hover:animate-head-shake"
			c="group text-white  bg-gradient-to-br from-green-2 to-green-6 transition-shadow duration-300 hover:via-green-6 focus:(via-green-7 ring-green-5)"
		/>
		<abutton
			v="Button"
			t="focus"
			:loading="true"
			loadc="text-lg"
			c="text-white bg-amber-6 hover:bg-amber-7 focus:ring-amber-5"
		/>
		<abutton
			v="Upload"
			t="focus"
			i="i-material-symbols:upload-rounded"
			ipos="right"
			ic="text-lg group-hover:animate-rubber-band"
			c="group text-white bg-lime-6 hover:bg-lime-7 focus:ring-lime-5"
		/>
		<abutton
			v="Button"
			t="focus"
			vc="group-hover:animate-jello"
			c="group text-indigo-5 border border-indigo-4 hover:bg-indigo-2 focus:ring-indigo-2"
		/>
		<abutton
			v="Button"
			t="focus"
			vc="group-hover:animate-tada"
			c="group text--1.5 text-purple-5 hover:bg-purple-2 focus:ring-purple-2"
		/>
		<abutton
			t="focus"
			i="i-material-symbols:edit-document-outline"
			ic="group-hover:animate-jack-in-the-box"
			c="group text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5"
			aria-label="Edit"
		/>
		<abutton
			v="Circle"
			t="circle"
			c="h-2.5rem text-xs text-white bg-gradient-to-r from-purple-3 to-pink-6 disabled:opacity-50 hover:bg-red-6/80 hover:animate-swing focus:(to-red-4 ring-red-3)"
		/>
		<abutton
			t="circle"
			i="i-ri:delete-bin-6-line"
			ic="text-lg group-hover:animate-bounce-in"
			c="h-2.5rem group text-white bg-orange-6 hover:bg-orange-7 focus:ring-orange-5"
			aria-label="Delete"
		/>
		<abutton
			t="circle"
			:loading="true"
			loadc="text-lg"
			c="h-2.5rem text-white bg-teal-6 hover:bg-teal-7 focus:ring-teal-5"
			aria-label="Loading"
		/>
		<abutton
			t="circle"
			i="i-ri:search-line"
			ic="text-lg group-hover:animate-heart-beat"
			c="h-2.5rem group text-gray-4 border border-gray-3 hover:bg-gray-2 focus:ring-gray-3"
			aria-label="Search"
		/>
		<abutton
			i="i-material-symbols:download-rounded"
			ic="group-hover:animate-bounce"
			c="group text-cyan-5 border border-cyan-4 hover:bg-cyan-2 focus:ring-cyan-2"
			aria-label="Download"
		/>
		<abutton
			t="circle"
			i="i-ic:outline-email"
			ic="text-xl group-hover:animate-wobble"
			c="group h-2.5rem text-violet-4 hover:bg-violet-2 focus:ring-violet-2"
			aria-label="Email"
		/>
		<abutton v="Button" t="focusblock" c="text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5" />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocButton",
};
</script>

<script setup lang="ts">
const text = ref("AgufaUI");
</script>
