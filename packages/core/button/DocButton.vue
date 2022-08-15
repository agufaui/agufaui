<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<a-button
			text="Button"
			aclass="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
		/>
		<a-button
			text="Button"
			atype="focus"
			icon="i-ph-anchor"
			iclass="group-hover:animate-head-shake"
			aclass="group text-white bg-green-6 hover:bg-green-7 focus:ring-green-5"
		/>
		<a-button
			text="Button"
			atype="focus"
			:loading="true"
			lclass="text-lg"
			aclass="text-white bg-amber-6 hover:bg-amber-7 focus:ring-amber-5"
		/>
		<a-button
			text="Upload"
			atype="focus"
			icon="i-material-symbols:upload-rounded"
			ipos="right"
			iclass="text-lg group-hover:animate-rubber-band"
			aclass="group text-white bg-lime-6 hover:bg-lime-7 focus:ring-lime-5"
		/>
		<a-button
			text="Button"
			atype="focus"
			tclass="group-hover:animate-jello"
			aclass="group text-indigo-5 border border-indigo-4 hover:bg-indigo-2 focus:ring-indigo-2"
		/>
		<a-button
			text="Button"
			atype="focus"
			tclass="group-hover:animate-tada"
			aclass="group text--1.5 text-purple-5 hover:bg-purple-2 focus:ring-purple-2"
		/>
		<a-button
			atype="focus"
			icon="i-material-symbols:edit-document-outline"
			iclass="group-hover:animate-jack-in-the-box"
			aclass="group text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5"
			aria-label="Edit"
		/>
		<a-button
			text="Circle"
			atype="circle"
			aclass="h-2.5rem text-xs text-white bg-red-6/60 disabled:opacity-50 hover:bg-red-6/80 hover:animate-swing focus:ring-red-4"
		/>
		<a-button
			atype="circle"
			icon="i-ri:delete-bin-6-line"
			iclass="text-lg group-hover:animate-bounce-in"
			aclass="h-2.5rem group text-white bg-orange-6 hover:bg-orange-7 focus:ring-orange-5"
			aria-label="Delete"
		/>
		<a-button
			atype="circle"
			:loading="true"
			lclass="text-lg"
			aclass="h-2.5rem text-white bg-teal-6 hover:bg-teal-7 focus:ring-teal-5"
			aria-label="Loading"
		/>
		<a-button
			atype="circle"
			icon="i-ri:search-line"
			iclass="text-lg group-hover:animate-heart-beat"
			aclass="h-2.5rem group text-gray-4 border border-gray-3 hover:bg-gray-2 focus:ring-gray-3"
			aria-label="Search"
		/>
		<a-button
			icon="i-material-symbols:download-rounded"
			iclass="group-hover:animate-bounce"
			aclass="group text-cyan-5 border border-cyan-4 hover:bg-cyan-2 focus:ring-cyan-2"
			aria-label="Download"
		/>
		<a-button
			atype="circle"
			icon="i-ic:outline-email"
			iclass="text-xl group-hover:animate-wobble"
			aclass="group h-2.5rem text-violet-4 hover:bg-violet-2 focus:ring-violet-2"
			aria-label="Email"
		/>
		<a-button
			text="Button"
			atype="focusblock"
			aclass="text-white bg-sky-5 hover:bg-sky-6 focus:ring-sky-5"
		/>
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
