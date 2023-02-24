<template>
	<div class="flex items-center flex-wrap gap-4">
		<!-- #region showcase -->
		<acheckbox :v="checked" t="green" @click="checked = !checked"> </acheckbox>
		<acheckbox
			:v="checked1"
			i="i-ic:baseline-minus"
			vc="text-blue-5 focus:ring-blue-3 hover:outline-blue-2"
		>
		</acheckbox>
		<acheckbox :v="checked2" :disabled="true"> </acheckbox>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocCheckbox",
};
</script>

<script setup lang="ts">
let checked = ref(false);
let checked1 = ref(false);
let checked2 = ref(false);
</script>
