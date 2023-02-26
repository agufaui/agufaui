<template lang="pug">
div(class="flex items-center" :class="[{'justify-end': right}, cc]")
  span(v-if="required" :class="v? error? crequiredec : crequiredc : crequiredc") *
  label(:for="id" :class="cvc") {{ v }}
  atooltip(v-bind="tooltip")
</template>

<script lang="ts">
export default {
	name: "Alabel",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IALabelProps } from "@agufaui/theme";
import { CALabelName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import Atooltip from "../tooltip/Atooltip.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IALabelProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IALabelProps>(
	props,
	CALabelName,
	defaultPropValues
);

const { cc, cvc, crequiredec, crequiredc } = computedProperties;
</script>
