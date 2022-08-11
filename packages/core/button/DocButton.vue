<template>
	<div class="flex items-center flex-wrap">
		<!-- #region showcase -->
		<a-button
			text="Button"
			aclass="m-2 text-white bg-blue-500 hover:(bg-blue-600 -translate-px shadow-md shadow-blue ) active:translate-px focus:ring-offset-none"
		/>
		<a-button
			text="Button"
			icon="i-ph-anchor"
			iclass="group-hover:animate-head-shake"
			aclass="m-2 group text-white bg-green-600 hover:bg-green-700 focus:ring-green-500"
		/>
		<a-button
			text="Button"
			:loading="true"
			lclass="text-lg"
			aclass="m-2 text-white bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
		/>
		<a-button
			text="Upload"
			icon="i-material-symbols:upload-rounded"
			ipos="right"
			iclass="text-lg group-hover:animate-rubber-band"
			aclass="m-2 group text-white bg-lime-600 hover:bg-lime-700 focus:ring-lime-500"
		/>
		<a-button
			text="Button"
			tclass="group-hover:animate-jello"
			aclass="m-2 group text-indigo-500 border border-indigo-400 hover:bg-indigo-200 focus:ring-indigo-200"
		/>
		<a-button
			text="Button"
			tclass="group-hover:animate-tada"
			aclass="m-2 group text--1.5 text-purple-500 hover:bg-purple-200 focus:ring-purple-200"
		/>
		<a-button
			icon="i-material-symbols:edit-document-outline"
			iclass="group-hover:animate-jack-in-the-box"
			aclass="m-2 group text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-500"
		/>
		<a-button
			text="Circle"
			atype="circle"
			aclass="m-2 h-2.5rem text-xs text-white bg-red-600/60 disabled:opacity-50 hover:bg-red-600/80 hover:animate-swing focus:ring-red-400"
		/>
		<a-button
			atype="circle"
			icon="i-ri:delete-bin-6-line"
			iclass="text-lg group-hover:animate-bounce-in"
			aclass="m-2 h-2.5rem group text-white bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
		/>
		<a-button
			atype="circle"
			:loading="true"
			lclass="text-lg"
			aclass="m-2 h-2.5rem text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
		/>
		<a-button
			atype="circle"
			icon="i-ri:search-line"
			iclass="text-lg group-hover:animate-heart-beat"
			aclass="m-2 h-2.5rem group text-gray-400 border border-gray-300 hover:bg-gray-200 focus:ring-gray-300"
		/>
		<a-button
			icon="i-material-symbols:download-rounded"
			iclass="group-hover:animate-bounce"
			aclass="m-2 group text-cyan-500 border border-cyan-400 hover:bg-cyan-200 focus:ring-cyan-200"
		/>
		<a-button
			atype="circle"
			icon="i-ic:outline-email"
			iclass="text-xl group-hover:animate-wobble"
			aclass="m-2 group h-2.5rem text-violet-400 hover:bg-violet-200 focus:ring-violet-200"
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
