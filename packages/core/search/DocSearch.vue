<template>
	<div class="flex flex-col gap-y-4">
		<!-- #region showcase -->
		<asearch
			v-model:v="text"
			vc="dark:text-white"
			@update:v="text = $event"
			@search="notify"
		></asearch>
		<asearch
			v-model:v="text2"
			t="inlineblock"
			:disabled="true"
			vc="dark:text-white"
			@update:v="text = $event"
			@search="notify"
		>
		</asearch>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocSearch",
	// mounted() {
	// 	this.$refs.search.focus();
	// },
};
</script>

<script setup lang="ts">
let text = ref("");
let text1 = ref("");
let text2 = ref("");

function notify() {
	console.log(text.value);
}
</script>
