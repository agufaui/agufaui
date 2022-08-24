<template lang="pug">
div(class="relative" :class="cc" @mouseover="show=true" @mouseleave="show=false" @focus="show=true" @focusout="show=false" @click="show=!show")
	p(class="inline-flex items-center" :class="cvc") {{ v }}
	div(class="absolute" :class="[show ? '' : 'hidden', clinksContainerc]")
		Ampanel(:links="links" :t="cmpanelType")
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

let show = ref(false);

const defaultPropValues = {
	// #region props
	mpanelType: "default",
	// #endregion props
};

const props = defineProps<IAMflyoutProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMflyoutProps>(
	props,
	CAMflyoutName,
	defaultPropValues
);

const { cc, cvc, clinksContainerc, cmpanelType } = computedProperties;
</script>
