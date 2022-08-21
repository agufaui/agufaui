<template lang="pug">
button(
  role="button"
  :type="ctype"
  v-bind="$attrs"
  class="inline-flex justify-center items-center cursor-pointer"
  :disabled="disabled || loading"
  :aria-disabled="disabled || loading"
  :class="[(ci || loading) && v ? cspacex : '', cipos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]"
  @click.stop="click($event)"
)
  slot
    span(v-if="loading" class="animate-spin preserve-3d" :class="[cloadicon, cloadc]")
    span(v-else-if="ci" :class="[ci, cic]")
    span(v-if="v" :class="cvc") {{ v }}
</template>

<script lang="ts">
export default {
	name: "Abutton", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAButtonProps, IAButtonEmits } from "@agufaui/theme";
import { CAButtonName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	type: "button",
	loadicon: "i-eos-icons:loading",
	spacex: "space-x-1.5",
	// #endregion props
};

const props = defineProps<IAButtonProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAButtonProps>(
	props,
	CAButtonName,
	defaultPropValues
);

const { ctype, cc, cvc, ci, cipos, cic, cloadicon, cloadc, cspacex } = computedProperties;

const emits = defineEmits<IAButtonEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};
</script>
