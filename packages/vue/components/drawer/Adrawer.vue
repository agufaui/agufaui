<template lang="pug">
div(class="relative" :class="cc" v-show="show")
  div(v-if="!permanent" class="fixed inset-0 flex z-1000")
    div(class="fixed inset-0" aria-hidden="true" @click.stop.prevent="close")
      div(class="absolute inset-0" :class="coverlayc")
      button(v-if="cclosei" class="flex items-center justify-center absolute" :class="[getCloseIconPos(cpos), cclosec]")
        span(class="sr-only") {{ tr(CADrawerName, "close") }}
        span(:class="[cclosei, ccloseic]")
  div(class="fixed z-1001 animate-duration-200" :class="[getPos(cpos), getAnimate(cpos), csidebarc]")
    slot
</template>

<script lang="ts">
export default {
	name: "Adrawer",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IADrawerProps, IADrawerEmits } from "@agufaui/theme";
import { CADrawerName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	closei: "i-ph:x-bold",
	pos: "left",
	// #endregion props
};

const props = defineProps<IADrawerProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADrawerProps>(
	props,
	CADrawerName,
	defaultPropValues
);

const { cc, cpos, coverlayc, cclosec, cclosei, ccloseic, csidebarc } = computedProperties;

const emits = defineEmits<IADrawerEmits>();

const close = () => {
	emits("close");
};

const { tr } = useLocale();

const getPos = (pos: string) => {
	switch (pos) {
		case "left":
			return "top-0 bottom-0 left-0";
		case "right":
			return "top-0 bottom-0 right-0";
		case "top":
			return "top-0 left-0 right-0";
		case "bottom":
			return "bottom-0 left-0 right-0";
	}
};

const getCloseIconPos = (pos: string) => {
	switch (pos) {
		case "left":
			return "top-0 right-0";
		case "right":
			return "top-0 left-0";
		case "top":
			return "bottom-0 right-0";
		case "bottom":
			return "top-0 right-0";
	}
};

const getAnimate = (pos: string) => {
	switch (pos) {
		case "left":
			if (props.show) {
				return "animate-slide-in-left";
			}

			return "animate-slide-out-right";
		case "right":
			if (props.show) {
				return "animate-slide-in-right";
			}

			return "animate-slide-out-left";
		case "top":
			if (props.show) {
				return "animate-slide-in-down";
			}

			return "animate-slide-out-up";
		case "bottom":
			if (props.show) {
				return "animate-slide-in-up";
			}

			return "animate-slide-out-down";
	}
};
</script>
