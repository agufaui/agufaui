<template lang="pug">
div(
  v-if="showAlert"
  v-bind="$attrs"
  class="items-start"
  :class="[cdisplay, cspacex, cipos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]")
  span(:class="[ci, cic]")
  span(class="block" :class="cvc")
    slot {{ v }}
  span(v-if="closable" class="flex-shrink-0 cursor-pointer" :class="[ccloseicon, cclosec]" @click.stop="click")
</template>

<script lang="ts">
export default {
	name: "Aalert",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAAlertProps, IAAlertEmits } from "@agufaui/theme";
import { CAAlertName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { watch, ref } from "vue";

const defaultPropValues = {
	// #region props
	display: "flex",
	spacex: "space-x-1.2",
	closeicon: "i-iwwa:delete",
	// #endregion props
};

const props = defineProps<IAAlertProps>();

let showAlert = ref(false);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAAlertProps>(
	props,
	CAAlertName,
	defaultPropValues
);

const { cdisplay, cc, cvc, ci, cipos, cic, cspacex, ccloseicon, cclosec } = computedProperties;

const emits = defineEmits<IAAlertEmits>();

const click = () => {
	showAlert.value = false;
	emits("close");
};

watch(
	() => props.show,
	(show) => {
		showAlert.value = show ? true : false;
	},
	{ immediate: true }
);
</script>
