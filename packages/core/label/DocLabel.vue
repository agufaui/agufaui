<template>
	<div class="flex flex-col gap-y-2">
		<!-- #region showcase -->
		<alabel v="Username" vc="dark:text-white" />
		<alabel v="Username" required vc="dark:text-white" />
		<alabel v="Username" required error vc="dark:text-white" />
		<alabel v="Username" required error vc="dark:text-white" :tooltip="{ v: 'user name' }" />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocLabel",
};
</script>
