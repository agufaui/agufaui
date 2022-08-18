<template>
	<div class="flex flex-col gap-y-4">
		<!-- #region showcase -->
		<ainput
			v-model:v="text"
			label="Username"
			t="inlineblock"
			vc="dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
			@update:v="notify"
		></ainput>
		<ainput
			label="Username"
			t="inlineblock"
			c="mt-3"
			vc="dark:text-white"
			labelc="dark:(bg-#242424 text-white) !peer-focus-within:(-translate-y-100% ml-0 bg-transparent) !peer-not-placeholder-shown:(-translate-y-100% ml-0 bg-transparent)"
		></ainput>
		<ainput
			label="Username"
			t=""
			c="mt-3"
			vc="dark:text-white block peer bg-transparent p-2 max-h-12 text-4 text-gray-7 border-b-1 border-gray-5 rounded-md disabled:text-gray-4 focus:outline-none"
			labelc="dark:(bg-#242424 text-white) text-4 text-gray-7 duration-300 peer-disabled:text-gray-4 peer-invalid:text-red-4 peer-focus-within:(scale-90 -translate-y-55% z-0 px-1 text-indigo-4) peer-not-placeholder-shown:(scale-90 -translate-y-55% z-0 px-1 text-indigo-4)"
		></ainput>
		<ainput t="inlineblock" vc="dark:text-white"></ainput>
		<ainput
			v="disabled"
			label="Username"
			t="inlineblock"
			:disabled="true"
			vc="dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		></ainput>
		<ainput
			label="Username"
			vc="w-full dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		></ainput>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocInput",
	// mounted() {
	// 	this.$refs.input.focus();
	// },
};
</script>

<script setup lang="ts">
let text = ref("");

function notify() {
	console.log(text.value);
}
</script>
