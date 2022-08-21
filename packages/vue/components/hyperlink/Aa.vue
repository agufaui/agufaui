<template lang="pug">
a(
  v-bind="$attrs"
  class="inline-flex cursor-pointer justify-center items-center"
  :tabindex="disabled || loading ? -1 : tabindex"
  :aria-disabled="disabled || loading"
  :class="[(ci || loading) && v ? cspacex : '', cipos === 'right' ? 'flex-row-reverse space-x-reverse' : '', disabled || loading ? cdisablec : '', cc]"
  @click.stop="click($event)"
)
  slot
    span(v-if="loading" class="animate-spin preserve-3d" :class="[cloadicon, cloadc]")
    span(v-else-if="ci" :class="[ci, cic]")
    span(v-if="v" :class="cvc") {{ v }}
</template>

<script lang="ts">
export default {
	name: "Aa", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAAProps, IAAEmits } from "@agufaui/theme";
import { CAAName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	loadicon: "i-eos-icons:loading",
	spacex: "space-x-1.5",
	// #endregion props
};

const props = defineProps<IAAProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAAProps>(props, CAAName, defaultPropValues);

const { cc, cvc, ci, cipos, cic, cloadicon, cloadc, cspacex, cdisablec } = computedProperties;

const emits = defineEmits<IAAEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};
</script>
