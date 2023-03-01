<template lang="pug">
div(class="flex flex-col items-center relative rounded-md w-full" :class="[cspacey, cc]")
  div(class="w-full" :class="labelasd ? uplabelasd ? 'flex flex-col justify-start' : clabelgridasdc : 'flex items-center'")
    alabel(v-if="labelasd" v-bind="labelasd" :class="clabelc")
    div(class="flex items-center relative w-full" :class="[{'animate-head-shake': errorasd}, labelasd ? uplabelasd ? '' : clabelgridspanasdc : '', ccomponentc]")
      slot(name="pre")
        abadge(v-if="prependasd" v-bind="prependasd")
      slot 
        component(:is="getComponent(vasd)" v-bind="{...propsasd, ...attrsasd, ...$attrs}")
      slot(name="post")
        abadge(v-if="postpendasd" v-bind="postpendasd")
  div(v-if="alertasd" class="relative w-full" :class="[labelasd ? uplabelasd ? 'flex justify-start' : clabelgridasdc : 'flex items-center']")
    div(v-if="labelasd")
    aalert(v-bind="alertasd" :class="[{'animate-head-shake': errorasd}, labelasd ? uplabelasd ? '' : clabelgridspanasdc : 'flex', cinfoc]")
      slot(name="info")
  div(class="relative w-full" :class="[labelasd ? uplabelasd ? 'flex justify-start' : clabelgridasdc : 'flex items-center']")
    div(v-if="labelasd")
    aalertError(v-bind="alerterrorasd" :class="[{'animate-head-shake': errorasd}, labelasd ? uplabelasd ? '' : clabelgridspanasdc : '', cmsgc]")
      slot(name="msg")
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
import Abadge from "../badge/Abadge.vue";
import Aalert from "../alert/Aalert.vue";
import AalertError from "../alertError/AalertError.vue";

const defaultPropValues = {
	// #region props
	spacey: "space-y-1",
	// #endregion props
};

const props = defineProps<IASdProps<any>>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASdProps<any>>(props, CASdName, defaultPropValues);

const { cspacey, cc, clabelgridasdc, clabelc, clabelgridspanasdc, ccomponentc, cinfoc, cmsgc } =
	computedProperties;

const getComponent = (name: string) => {
	if (!name) {
		return;
	}

	return defineAsyncComponent(() => import(`../${props.dirasd}/A${name}.vue`));
};
</script>
