<template lang="pug">
div(
  v-if="cShow"
  v-bind="$attrs"
  u-flex="~"
  u-justify="items-start"
  :class="[cSpaceX, cAClass]")
  div(v-if="cIconPosition === 'left'" :class="[cIcon, cIconMargin, cIconColor, cIconClass]")
  span(class="block" :class="[cColor, cSize, cFont, cMaxWidth, cMsgClass]")
    slot {{ msg }}
  div(v-if="cIconPosition === 'right'" class="mt-0.4" :class="[cIcon, cIconColor, cIconClass]")
  div(v-if="cCloseable" class="i-typcn:delete" u-flex="shrink-0" u-text="xl gray-400" u-cursor="pointer" @click="click(false)")
</template>

<script lang="ts">
export default {
  name: "AAlert",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { AAlertProps, AAlertEmits } from "../../../core/alert/types";
import type Config from "../../../core/config";

const props = defineProps<AAlertProps>();

let config = inject<Config>("agufaUIConfig");
const component = "aalert";

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<AAlertProps>(
  props,
  component,
  config
);

const {
  cShow,
  cColor,
  cSize,
  cFont,
  cAClass,
  cIcon,
  cIconColor,
  cIconMargin,
  cIconPosition,
  cIconClass,
  cMsgClass,
  cCloseable,
  cSpaceX,
  cMaxWidth,
} = computedProperties;

const emits = defineEmits<AAlertEmits>();

const click = (show: boolean) => {
  emits("closea", show);
};
</script>
