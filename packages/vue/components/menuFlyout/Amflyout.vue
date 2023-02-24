<template lang="pug">
div(class="relative" :class="cc" @mouseover="show=true" @mouseleave="show=false" @focus="show=true" @focusout="show=false" @click="show=!show")
  p(class="inline-flex items-center justify-between cursor-pointer")
    span(class="flex items-center" :class="ctitlesc")
      span(v-if="ci" :class="[ci, cic]")
      span(class="inline-flex items-center justify-between")
        span(:class="cvc") {{ v }}
          slot
        span(v-if="badges" class="inline-flex items-center justify-between" :class="cbadgesc")
          abadge(v-for="badge, i in badges" :key="i" v-bind="badge")
    span(v-if="showarrow" class="flex-shrink-0 transition-transform duration-200" :class="[carrowi, show? 'rotate-180' : 'rotate-0', carrowic]")
  div(class="absolute" :class="[show ? '' : 'hidden', cmpanelc]")
    ampanel(v-bind="{...mpanel, ...$attrs}")
</template>

<script lang="ts">
export default {
	name: "Amflyout",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMflyoutProps } from "@agufaui/theme";
import { CAMflyoutName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { ref } from "vue";
import Ampanel from "../menuPanel/Ampanel.vue";
import Abadge from "../badge/Abadge.vue";

let show = ref(false);

const defaultPropValues = {
	// #region props
	arrowi: "i-ion:arrow-down-b",
	// #endregion props
};

const props = defineProps<IAMflyoutProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMflyoutProps>(
	props,
	CAMflyoutName,
	defaultPropValues
);

const { cc, ci, ctitlesc, cic, cvc, cbadgesc, carrowi, carrowic, cmpanelc } = computedProperties;
</script>
