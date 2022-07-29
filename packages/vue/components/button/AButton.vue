<template lang="pug">
button(
  role="button"
  :type="cType"
  v-bind="$attrs"
  @click.stop="click($event)"
  u-pos="relative"
  u-flex="inline"
  u-justify="center"
  u-items="center"
  u-border="~ transparent"
  u-font="medium"
  u-outline="focus:none"
  u-ring="focus:(2 offset-2)"
  u-opacity="disabled:70"
  u-select="none"
  u-cursor="pointer"
  :disabled="cDisabled || cLoading"
  :class="[cPx, cPy, cSize, cColor, cRound, cBg, cHover, cFocus, {'w-full': cFull}, cAClass]"
)
  slot
    div(class="flex justify-center justify-items-center" :class="cSpaceX")
      span(v-if="text && cIconPosition==='right'") {{ text }}
      span(v-if="cLoading")
        div(class="animate-spin preserve-3d text-lg" :class="[cLoadingIcon, {'h-full': text}, cLoadingClass]")
      span(v-else-if="cIcon")
        div(:class="[cIcon, {'h-full': text}, cIconClass]")
      span(v-if="text && cIconPosition==='left'") {{ text }}
</template>

<script lang="ts">
export default {
  name: "AButton", // name field must be specified for plugin (global component registration) to work
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAButtonProps, IAButtonEmits } from "@agufaui/theme";
import { DAButton } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { aUseVueComponent } from "@agufaui/use";
import { inject } from "vue";

const props = defineProps<IAButtonProps>();

let config = inject<IConfig>("agufaUIConfig");
const component = "abutton";
const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<IAButtonProps>(
  props,
  component,
  config,
  DAButton
);

const {
  cType,
  cPx,
  cPy,
  cSize,
  cColor,
  cRound,
  cBg,
  cHover,
  cFocus,
  cFull,
  cDisabled,
  cAClass,
  cIcon,
  cIconPosition,
  cIconClass,
  cLoading,
  cLoadingIcon,
  cLoadingClass,
  cSpaceX,
} = computedProperties;

const emits = defineEmits<IAButtonEmits>();

const click = (e: MouseEvent) => {
  emits("click", e);
};
</script>
