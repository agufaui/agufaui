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
			v-model:v="text1"
			label="Username"
			t="inlineblock"
			c="mt-3"
			vc="dark:text-white"
			labelc="dark:(bg-#242424 text-white) !peer-focus-within:(-translate-y-100% ml-0 bg-transparent) !peer-not-placeholder-shown:(-translate-y-100% ml-0 bg-transparent)"
		>
		</ainput>
		<ainput
			v-model:v="text2"
			label="Username"
			t=""
			c="mt-3"
			vc="dark:text-white block peer bg-transparent p-2 max-h-12 text-4 text-gray-7 border-b-1 border-gray-5 rounded-md disabled:text-gray-4 focus:outline-none"
			labelc="dark:(bg-#242424 text-white) text-4 text-gray-7 duration-300 peer-disabled:text-gray-4 peer-invalid:text-red-4 peer-focus-within:(scale-90 -translate-y-55% z-0 px-1 text-indigo-4) peer-not-placeholder-shown:(scale-90 -translate-y-55% z-0 px-1 text-indigo-4)"
		>
		</ainput>
		<ainput v-model:v="text3" t="inlineblock" vc="dark:text-white"></ainput>
		<ainput
			v="disabled"
			label="Username"
			t="inlineblock"
			:disabled="true"
			vc="dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		></ainput>
		<ainput
			v-model:v="text4"
			label="Username"
			vc="w-full dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		>
		</ainput>
		<ainput
			v-model:v="text5"
			type="date"
			label="Date"
			vc="w-full dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		>
		</ainput>
		<ainput
			v-model:v="text6"
			type="time"
			label="Time"
			vc="w-full dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		>
		</ainput>
		<ainput
			v-model:v="text7"
			type="datetime-local"
			label="DateTime"
			vc="w-full dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		>
		</ainput>
		<ainput
			v-model:v="text8"
			type="range"
			label="Range"
			vc="w-full dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
		>
		</ainput>
		<ainput
			v-model:v="text9"
			type="color"
			label="Color"
			vc="h-12 dark:text-white"
			labelc="!ml-0 dark:(bg-#242424 text-white)"
		>
		</ainput>
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
let text1 = ref("");
let text2 = ref("");
let text3 = ref("");
let text4 = ref("");
let text5 = ref("");
let text6 = ref("");
let text7 = ref("");
let text8 = ref("");
let text9 = ref("");

function notify() {
	console.log(text.value);
}
</script>
