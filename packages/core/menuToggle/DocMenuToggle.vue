<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<amtoggle :open="open" @click="open = !open" />
		<amtoggle
			:open="open"
			i="i-icon-park-outline:menu-unfold"
			closeicon="i-icon-park-outline:menu-fold"
			@click="open = !open"
		/>
		<amtoggle
			:open="open"
			i="i-system-uicons:side-menu"
			closeicon="i-system-uicons:menu-vertical"
			@click="open = !open"
		/>
		<amtoggle
			:open="open"
			i="i-icon-park-outline:application-menu"
			closeicon="i-healthicons:ui-menu-grid-outline"
			@click="open = !open"
		/>
		<amtoggle
			:open="open"
			t=""
			c="rounded-sm p-1.5 shadow-sm text-2xl text-white bg-blue-4 hover:bg-blue-5 focus:outline-none"
			@click="open = !open"
		/>
		<amtoggle
			:open="open"
			v="menu"
			vc="text-gray-4 text-sm ml-0.5"
			i="i-icon-park-outline:menu-fold-one"
			closeicon="i-icon-park-outline:menu-unfold-one"
			@click="open = !open"
		/>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuToggle",
};
</script>

<script setup lang="ts">
let open = ref(false);
</script>
