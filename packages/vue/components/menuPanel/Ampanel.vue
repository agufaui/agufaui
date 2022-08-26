<template lang="pug">
div(:class="cc")
	a(v-bind="$attrs"
		class="flex items-center"
		v-for="link, i in links"
		:class="[clinkc, link.hrefc]"
		:href="link.href"
		:key="i")
		span(class="flex-shrink-0" v-if="link.i" :class="[cic, link.i, link.ic]")
		span(:class="ctitlesc")
			p(:class="[cvc, link.vc]") {{link.v}}
			p(v-if="link.subtitle" :class="[csubtitlec, link.subtitlec]") {{link.subtitle}}
</template>

<script lang="ts">
export default {
	name: "Ampanel",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMpanelProps } from "@agufaui/theme";
import { CAMpanelName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IAMpanelProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMpanelProps>(
	props,
	CAMpanelName,
	defaultPropValues
);

const { cc, clinkc, cic, ctitlesc, cvc, csubtitlec } = computedProperties;
</script>
