<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<amtoggle :open="open" @click="open = !open" />
		<amtoggle
			:open="open1"
			i="i-icon-park-outline:menu-unfold"
			closeicon="i-icon-park-outline:menu-fold"
			@click="open1 = !open1"
		/>
		<amtoggle
			:open="open2"
			i="i-system-uicons:side-menu"
			closeicon="i-system-uicons:menu-vertical"
			@click="open2 = !open2"
		/>
		<amtoggle
			:open="open3"
			i="i-icon-park-outline:application-menu"
			closeicon="i-healthicons:ui-menu-grid-outline"
			@click="open3 = !open3"
		/>
		<amtoggle
			:open="open4"
			t=""
			c="rounded-sm p-1.5 shadow-sm text-2xl text-white bg-blue-4 hover:bg-blue-5 focus:outline-none"
			@click="open4 = !open4"
		/>
		<amtoggle
			:open="open5"
			v="menu"
			vc="text-gray-4 text-sm ml-0.5"
			i="i-icon-park-outline:menu-fold-one"
			closeicon="i-icon-park-outline:menu-unfold-one"
			@click="open5 = !open5"
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
let open1 = ref(false);
let open2 = ref(false);
let open3 = ref(false);
let open4 = ref(false);
let open5 = ref(false);
</script>
