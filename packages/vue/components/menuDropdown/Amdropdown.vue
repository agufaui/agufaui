<template lang="pug">
div(:class="cc")
  div(class="flex items-center justify-between cursor-pointer" :class="ctitlesc" @click.stop="menu = !menu")
    span(class="flex items-center")
      span(v-if="ci" :class="[ci, cic]")
      span(:class="cvc") {{ v }}
    span(class="flex-shrink-0 transition-transform duration-200" :class="[carrowi, menu? 'rotate-180' : 'rotate-0']")
  div(v-if="menu" class="mt-1" :class="clinksc")
    ampanel(:links="links" v-bind="$attrs" :t="cmpanelt")
</template>

<script lang="ts">
export default {
	name: "Amdropdown",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMdropdownProps } from "@agufaui/theme";
import { CAMdropdownName } from "@agufaui/theme";
import { CDefaultType } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { ref } from "vue";
import Ampanel from "../menuPanel/Ampanel.vue";

let menu = ref(false);

const defaultPropValues = {
	// #region props
	arrowi: "i-ion:arrow-down-b",
	mpanelt: CDefaultType,
	// #endregion props
};

const props = defineProps<IAMdropdownProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMdropdownProps>(
	props,
	CAMdropdownName,
	defaultPropValues
);

const { cc, ci, cic, cvc, ctitlesc, carrowi, clinksc, cmpanelt } = computedProperties;
</script>
