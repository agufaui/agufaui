<template lang="pug">
div(class="fixed z-100 inset-0 overflow-y-auto" v-if="showModal" :class="cc")
  div(class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0")
    div(class="fixed inset-0 transition-opacity" aria-hidden="true")
      div(class="absolute inset-0 bg-gray-5 opacity-75")
    span(class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true") &#8203;
    div(class="inline-block" role="dialog" aria-modal="true" aria-labelledby="modal-headline" v-bind="$attrs" :class="cpanelc")
      div(class="absolute top-0 right-0 pt-4 pr-4")
        div(v-if="closable" class="flex-shrink-0 cursor-pointer" :class="[ccloseicon, cclosec]" @click.stop="close")
      slot
</template>

<script lang="ts">
export default {
	name: "Amodal",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAModalProps, IAModalEmits } from "@agufaui/theme";
import { CAModalName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { watch, ref } from "vue";

let showModal = ref(false);

const defaultPropValues = {
	// #region props
	closeicon: "i-iwwa:delete",
	// #endregion props
};

const props = defineProps<IAModalProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAModalProps>(
	props,
	CAModalName,
	defaultPropValues
);

const { cc, cpanelc, ccloseicon, cclosec } = computedProperties;

const emits = defineEmits<IAModalEmits>();

const close = () => {
	showModal.value = false;
	emits("close");
};

watch(
	() => props.show,
	(show) => {
		showModal.value = show ? true : false;
	},
	{ immediate: true }
);
</script>
