<template lang="pug">
button(
  aria-haspopup="true" aria-expanded="true"
  v-bind="$attrs"
  @click="click($event)"
  :disabled="disabled"
  class="disabled:(opacity-50 cursor-not-allowed)"
  :class="cc"
)
  i(class="w-5 h-6" :class="[ci, cic]")
  div(:class="clabelc")
    slot
  i(class="h-5 w-5" :class="[carrowi, carrowc]")
</template>

<script lang="ts">
export default {
	name: "Adropdowncontrol",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IADropdownControlProps, IADropdownControlEmits } from "@agufaui/theme";
import { CADropdownControlName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	i: "i-ion:funnel-outline",
	arrowi: "i-material-symbols:keyboard-arrow-down",
	// #endregion props
};

const props = defineProps<IADropdownControlProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADropdownControlProps>(
	props,
	CADropdownControlName,
	defaultPropValues
);

const { cc, ci, cic, clabelc, carrowi, carrowc } = computedProperties;

const emits = defineEmits<IADropdownControlEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};
</script>
