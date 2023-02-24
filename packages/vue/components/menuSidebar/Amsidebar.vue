<template lang="pug">
div(:class="cc")
	div(class="flex flex-col flex-1")
		div(class="flex flex-col flex-1 h-0")
			slot(name="header")
			nav(class="flex flex-col flex-1 overflow-y-auto" :class="cmpanelc")
				ampanel(v-bind="{...mpanel, ...$attrs}")
			slot(name="footer")
</template>

<script lang="ts">
export default {
	name: "Amsidebar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMsidebarProps } from "@agufaui/theme";
import { CAMsidebarName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import Ampanel from "../menuPanel/Ampanel.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IAMsidebarProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMsidebarProps>(
	props,
	CAMsidebarName,
	defaultPropValues
);

const { cc, cmpanelc } = computedProperties;
</script>
