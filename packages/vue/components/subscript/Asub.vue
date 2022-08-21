<template lang="pug">
sub(
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
	name: "Asub", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IASubProps } from "@agufaui/theme";
import { CASubName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	spacex: "space-x-1.5",
	// #endregion props
};

const props = defineProps<IASubProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASubProps>(props, CASubName, defaultPropValues);

const { cc, cvc, ci, cipos, cic, cspacex } = computedProperties;
</script>
