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
    span(class="sr-only") {{ open? tr(CAMobileName, "close") : tr(CAMobileName, "open") }}
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
import { useVue, useLocale } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	i: "i-tabler:menu-2",
	closeicon: "i-material-symbols:close",
	// #endregion props
};

const props = defineProps<IAMobileProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMobileProps>(
	props,
	CAMobileName,
	defaultPropValues
);

const { cc, ccloseicon, ci, cic, cclosec } = computedProperties;

const emits = defineEmits<IAMobileEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};

const { tr } = useLocale();
</script>
