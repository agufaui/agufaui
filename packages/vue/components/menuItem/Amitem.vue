<template lang="pug">
component(:is="getComponent(v.name)" v-bind="{...v.props, ...v.attrs}")
</template>

<script lang="ts">
export default {
	name: "Amitem",
};
</script>

<script setup lang="ts">
import type { IAMitemProps } from "@agufaui/theme";
import { defineAsyncComponent } from "vue";

defineProps<IAMitemProps>();

const getComponent = (name: string) => {
	if (!name) {
		return;
	}

	const subName = name.charAt(0).toUpperCase() + name.substring(1);
	return defineAsyncComponent(() => import(`../menu${subName}/Am${name}.vue`));
};
</script>
