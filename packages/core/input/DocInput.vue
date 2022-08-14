<template>
	<div class="flex flex-col gap-y-4">
		<!-- #region showcase -->
		<a-input
			v-model="text"
			label="Username"
			atype="inlineblock"
			aclass="dark:text-white"
			lclass="dark:(bg-#242424 text-white)"
			@update:model-value="notify"
		></a-input>
		<a-input
			label="Username"
			atype="inlineblock"
			cclass="mt-3"
			aclass="dark:text-white"
			lclass="dark:(bg-#242424 text-white) peer-focus-within:(-translate-y-100% ml-0 bg-transparent)"
		></a-input>
		<a-input
			label="Username"
			atype=""
			cclass="mt-3"
			aclass="dark:text-white block peer bg-transparent p-2 max-h-12 text-4 text-gray-7 border-b-1 border-gray-5 rounded-md disabled:text-gray-4 focus:outline-none"
			lclass="dark:(bg-#242424 text-white) text-4 text-gray-7 duration-300 peer-disabled:text-gray-4 peer-invalid:text-red-4 peer-focus-within:(scale-90 -translate-y-55% z-0 px-1 text-indigo-4) [&:not(peer-placeholder-shown)]:(scale-90 -translate-y-55% z-0 px-1 text-indigo-4)"
		></a-input>
		<a-input atype="inlineblock" aclass="dark:text-white"></a-input>
		<a-input
			label="Username"
			aclass="w-full dark:text-white"
			lclass="dark:(bg-#242424 text-white)"
		></a-input>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocInput",
};
</script>

<script setup lang="ts">
let text = ref("");

function notify() {
	console.log(text.value);
}
</script>
