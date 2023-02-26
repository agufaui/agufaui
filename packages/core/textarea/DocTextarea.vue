<template>
	<div class="flex flex-col gap-y-4">
		<!-- #region showcase -->
		<atextarea
			v-model:v="text"
			label="Comment"
			t="inlineblock"
			:rows="5"
			vc="dark:text-white"
			labelc="dark:(bg-#242424 text-white)"
			@update:v="notify"
		></atextarea>
		<atextarea
			v-model:v="text1"
			label="Comment"
			t="inlineblock"
			:rows="5"
			c="mt-3"
			vc="dark:text-white"
			disabled
			labelc="dark:(bg-#242424 text-white) !peer-focus-within:(-translate-y-100% ml-0 bg-transparent) !peer-not-placeholder-shown:(-translate-y-100% ml-0 bg-transparent)"
		>
		</atextarea>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocTextarea",
};
</script>

<script setup lang="ts">
let text = ref("");
let text1 = ref("");

function notify() {
	console.log(text.value);
}
</script>
