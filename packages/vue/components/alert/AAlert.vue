<template lang="pug">
div(
  v-if="showAlert"
  v-bind="$attrs"
  class="flex items-start"
  :class="[cspacex, ccclass]")
  div(v-if="cipos === 'left'" :class="[cicon, ciclass]")
  span(class="block" :class="caclass")
    slot {{ msg }}
  div(v-if="cipos === 'right'" :class="[cicon, ciclass]")
  div(v-if="closable" class="flex-shrink-0 cursor-pointer" :class="[cclicon, cclclass]" @click="click")
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
	// #region props
	ipos: "left",
	spacex: "space-x-1.2",
	clicon: "i-iwwa:delete",
	// #endregion props
});

let showAlert = ref(false);

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAAlertProps>(props, CAAlertName, config);

const { caclass, ccclass, cicon, cipos, ciclass, cspacex, cclicon, cclclass } = computedProperties;

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
