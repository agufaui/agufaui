<template lang="pug">
div(:class="cc" v-show="show")
	div(class="fixed inset-0 flex z-100" @click.stop.prevent="click()")
		div(class="fixed inset-0" aria-hidden="true")
			div(class="absolute inset-0" :class="coverlayc")
			button(v-if="cclosei" class="flex items-center justify-center absolute top-0 right-0" :class="cclosec")
				span(class="sr-only") {{ tr(CAMmsidebarName, "close") }}
				span(:class="[cclosei, ccloseic]")
		div(class="relative flex-1 flex flex-col" :class="csidebarc")
			slot(name="header")
			nav(class="flex flex-col flex-1 overflow-y-auto" :class="cmpanelc")
				ampanel(v-bind="{...mpanel, ...$attrs}")
			slot(name="footer")
		div(class="flex-shrink-0 w-14" aria-hidden="true")
</template>

<script lang="ts">
export default {
	name: "Ammmsidebar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMmsidebarProps, IAMmsidebarEmits } from "@agufaui/theme";
import { CAMmsidebarName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";
import Ampanel from "../menuPanel/Ampanel.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IAMmsidebarProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMmsidebarProps>(
	props,
	CAMmsidebarName,
	defaultPropValues
);

const { cc, coverlayc, cclosec, cclosei, ccloseic, csidebarc, cmpanelc } = computedProperties;

const emits = defineEmits<IAMmsidebarEmits>();

const click = () => {
	emits("close");
};

const { tr } = useLocale();
</script>
