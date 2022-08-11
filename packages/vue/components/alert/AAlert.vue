<template lang="pug">
div(
  v-if="showAlert"
  v-bind="$attrs"
  class="flex items-start"
  :class="[cspacex, caclass]")
  div(v-if="cipos === 'left'" :class="[cicon, ciclass]")
  span(class="block" :class="cmclass")
    slot {{ msg }}
  div(v-if="cipos === 'right'" :class="[cicon, ciclass]")
  div(v-if="closable" class="i-typcn:delete flex-shrink-0 text-xl text-gray-400 cursor-pointer" @click="click")
</template>

<script lang="ts">
export default {
	name: "AAlert",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAAlertProps, IAAlertEmits } from "@agufaui/theme";
import { CAAlertName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { watch, ref, inject } from "vue";

const props = withDefaults(defineProps<IAAlertProps>(), {
	ipos: "left",
	spacex: "space-x-1.2",
});

let showAlert = ref(false);

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAAlertProps>(props, CAAlertName, config);

const { caclass, cicon, cipos, ciclass, cmclass, cspacex } = computedProperties;

const emits = defineEmits<IAAlertEmits>();

const click = () => {
	showAlert.value = false;
	emits("closea");
};

watch(
	() => props.show,
	(show) => {
		showAlert.value = show ? true : false;
	},
	{ immediate: true }
);
</script>
