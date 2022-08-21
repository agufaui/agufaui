<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<amobile :open="open" @click="open = !open" />
		<amobile
			:open="open"
			i="i-icon-park-outline:menu-unfold"
			closeicon="i-icon-park-outline:menu-fold"
			@click="open = !open"
		/>
		<amobile
			:open="open"
			i="i-system-uicons:side-menu"
			closeicon="i-system-uicons:menu-vertical"
			@click="open = !open"
		/>
		<amobile
			:open="open"
			i="i-icon-park-outline:application-menu"
			closeicon="i-healthicons:ui-menu-grid-outline"
			@click="open = !open"
		/>
		<amobile
			:open="open"
			t=""
			c="rounded-sm p-1.5 shadow-sm text-2xl text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
			@click="open = !open"
		/>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMobile",
};
</script>

<script setup lang="ts">
let open = ref(false);
</script>
