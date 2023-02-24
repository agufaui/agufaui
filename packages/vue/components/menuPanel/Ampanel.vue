<template lang="pug">
//- @ts-ignore
div(:class="cc" v-bind="$attrs")
  div(v-for="section, i in sections" :key="i" :class="csectionc")
    p(v-if="section.title" :class="ctitlec") {{ section.title }}
    amitem(v-for="item, j in section.items" :key="j" :v="item")
</template>

<script lang="ts">
export default {
	name: "Ampanel",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMpanelProps } from "@agufaui/theme";
import { CAMpanelName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import Amitem from "../menuItem/Amitem.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IAMpanelProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMpanelProps>(
	props,
	CAMpanelName,
	defaultPropValues
);

const { cc, csectionc, ctitlec } = computedProperties;
</script>
