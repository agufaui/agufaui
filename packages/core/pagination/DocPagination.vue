<template>
	<div class="flex items-center flex-wrap flex-col space-y-4">
		<!-- #region showcase -->
		<apagination :total-pages="50" :current-page="25" @change="change($event)" />
		<apagination :total-pages="50" :current-page="25" goto @change="change($event)" />
		<apagination
			:total-pages="50"
			:current-page="25"
			goto
			goto-pos="right"
			@change="change($event)"
		/>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocPagination",
};
</script>

<script setup lang="ts">
const curPage = ref(1);
const change = (e: number) => {
	curPage.value = e;
};
</script>
