<template lang="pug">
sup(
  v-bind="$attrs"
  class="inline-flex justify-center items-center"
  :class="[ci ? cspacex : '', cipos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]"
)
  slot
    span(v-if="ci" :class="[ci, cic]")
    span(v-if="v" :class="cvc") {{ v }}
</template>

<script lang="ts">
export default {
	name: "Asup", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IASupProps } from "@agufaui/theme";
import { CASupName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	spacex: "space-x-1.5",
	// #endregion props
};

const props = defineProps<IASupProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASupProps>(props, CASupName, defaultPropValues);

const { cc, cvc, ci, cipos, cic, cspacex } = computedProperties;
</script>
