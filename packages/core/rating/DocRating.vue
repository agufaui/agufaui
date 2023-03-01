<template>
	<div class="flex flex-col gap-y-2">
		<!-- #region showcase -->
		<arating :v="3.5" />
		<arating :v="score" clickable @click="score = $event" />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocRating",
};
</script>

<script setup lang="ts">
const score = ref(0);
</script>
