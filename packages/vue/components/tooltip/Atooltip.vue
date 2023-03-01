<template lang="pug">
div(class="relative cursor-pointer" v-if="v" :class="cc" @mouseover="show=true" @click="show=true" @mouseleave="show=false")
  span(class="absolute" v-bind="$attrs" v-if="show" :class="[show? 'z-50' : 'hidden', cvc]") {{ v }}
  div(:class="[ci, cic]")
</template>

<script lang="ts">
export default {
	name: "Atooltip",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IATooltipProps } from "@agufaui/theme";
import { CATooltipName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { ref } from "vue";

let show = ref(false);

const defaultPropValues = {
	// #region props
	i: "i-ph:question-fill",
	// #endregion props
};

const props = defineProps<IATooltipProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IATooltipProps>(
	props,
	CATooltipName,
	defaultPropValues
);

const { cc, cvc, ci, cic } = computedProperties;
</script>
