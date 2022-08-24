<template lang="pug">
div(:class="cc")
	a(class="flex items-center"
		:class="[clinkc, link.hrefClass]"
		v-for="link, i in links" :href="link.href" :key="i")
		span(class="flex-shrink-0" v-if="link.icon" :class="[ciconc, link.icon, link.iconClass]")
		span(:class="ctitlesContainerc")
			p(:class="[ctitlec, link.titleClass]") {{link.title}}
			p(v-if="link.subtitle" :class="[csubtitlec, link.subtitleClass]") {{link.subtitle}}
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

const { cc, clinkc, ciconc, ctitlesContainerc, ctitlec, csubtitlec } = computedProperties;
</script>
