<template lang="pug">
button(
  role="button"
  type="button"
  v-bind="$attrs"
  class="inline-flex justify-center items-center cursor-pointer"
  :class="cc"
  @click.stop="click($event)"
)
  slot
    span(class="sr-only") {{ open? 'Close menu' : 'Open menu' }}
    span(v-if="open" :class="[ccloseicon, cclosec]")
    span(v-else :class="[ci, cic]")
</template>

<script lang="ts">
export default {
	name: "Amobile", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMobileProps, IAMobileEmits } from "@agufaui/theme";
import { CAMobileName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { inject } from "vue";

const defaultPropValues = {
	// #region props
	i: "i-tabler:menu-2",
	closeicon: "i-material-symbols:close",
	// #endregion props
};

const props = defineProps<IAMobileProps>();

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMobileProps>(
	props,
	CAMobileName,
	config,
	defaultPropValues
);

const { cc, ccloseicon, ci, cic, cclosec } = computedProperties;

const emits = defineEmits<IAMobileEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};
</script>
