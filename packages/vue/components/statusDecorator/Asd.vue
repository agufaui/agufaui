<template lang="pug">
div(class="items-center relative rounded-md shadow-sm w-full" :class="[{'flex-col': uplabelasd}, labelasd ? clabelgridasdc : 'flex', cc]")
  alabel(v-if="labelasd" v-bind="labelasd")
  div(class="flex flex-col w-full" :class="[{'animate-wobble': errorasd}, labelasd ? clabelgridspanasdc : '']")
    div(class="relative w-full select-none row-start-1")
      component(:is="getComponent(vasd)" v-bind="{...propsasd, ...attrsasd, ...$attrs}")
    aalert(v-if="alertasd" v-bind="alertasd" class="row-start-2")
    aalertError(v-bind="alerterrorasd" class="row-start-3")
</template>

<script lang="ts">
export default {
	name: "Asd",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IASdProps } from "@agufaui/theme";
import { CASdName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { defineAsyncComponent } from "vue";
import Alabel from "../label/Alabel.vue";
import Aalert from "../alert/Aalert.vue";
import AalertError from "../alertError/AalertError.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IASdProps<any>>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASdProps<any>>(props, CASdName, defaultPropValues);

const { cc, clabelgridasdc, clabelgridspanasdc } = computedProperties;

const getComponent = (name: string) => {
	if (!name) {
		return;
	}

	return defineAsyncComponent(() => import(`../${props.dirasd}/A${name}.vue`));
};
</script>
