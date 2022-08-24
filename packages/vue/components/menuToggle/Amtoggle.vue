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
    span(class="sr-only") {{ open? tr(CAMtoggleName, "close") : tr(CAMtoggleName, "open") }}
    span(v-if="open" :class="[ccloseicon, cclosec]")
    span(v-else :class="[ci, cic]")
    span(v-if="v" :class="cvc") {{v}}
</template>

<script lang="ts">
export default {
	name: "Amtoggle", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMtoggleProps, IAMtoggleEmits } from "@agufaui/theme";
import { CAMtoggleName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	i: "i-tabler:menu-2",
	closeicon: "i-material-symbols:close",
	// #endregion props
};

const props = defineProps<IAMtoggleProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMtoggleProps>(
	props,
	CAMtoggleName,
	defaultPropValues
);

const { cc, ccloseicon, ci, cic, cclosec, cvc } = computedProperties;

const emits = defineEmits<IAMtoggleEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};

const { tr } = useLocale();
</script>
