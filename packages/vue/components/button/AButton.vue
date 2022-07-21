<template lang="pug">
button(
  role="button"
  :type="cType"
  v-bind="$attrs"
  u-pos="relative"
  u-flex="inline"
  u-justify="center items-center"
  u-border="~ transparent"
  u-font="medium"
  u-outline="focus:none"
  u-ring="focus:(2 offset-2)"
  u-opacity="disabled:70"
  u-select="none"
  u-cursor="pointer"
  :disabled="cDisabled || cLoading"
  :class="[cPx, cPy, cSize, cColor, cRound, cBg, cIfHover, cIfFocus, {'w-full': cFull}, cAClass]"
)
  slot
    div(class="flex justify-center justify-items-center" :class="cSpaceBetween")
      span(v-if="text && cIconPositon==='right'") {{ text }}
      span(v-if="cLoading")
        div(class="animate-spin preserve-3d text-lg" :class="[cLoadingIcon, cIconColor, cIconSize, {'h-full': text !== ''}, cLoadingClass]")
      span(v-else-if="cIcon")
        div(:class="[cIcon, {'h-full': text !== ''}, cIconClass]")
      span(v-if="text && cIconPositon==='left'") {{ text }}
</template>

<script lang="ts">
export default {
  name: "AButton", // name field must be specified for plugin (global component registration) to work
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { AButtonProps } from "../../../core/button/types";
import type Config from "../../../core/config";

const props = defineProps<AButtonProps>();

let config = inject<Config>("agufaUIConfig");
const component = "abutton";
const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<AButtonProps>(
  props,
  component,
  config
);

const {
  cType,
  cPx,
  cPy,
  cSize,
  cColor,
  cRound,
  cBg,
  cIfHover,
  cIfFocus,
  cFull,
  cDisabled,
  cAClass,
  cIcon,
  cIconColor,
  cIconSize,
  cIconPositon,
  cIconClass,
  cLoading,
  cLoadingIcon,
  cLoadingClass,
  cSpaceBetween,
} = computedProperties;
</script>
