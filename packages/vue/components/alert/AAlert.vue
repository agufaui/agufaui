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
import type { IAAlertProps, IAAlertEmits } from "@agufaui/theme";
import { DAAlert } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { aUseVueComponent } from "@agufaui/use";
import { inject } from "vue";

const props = defineProps<IAAlertProps>();

let config = inject<IConfig>("agufaUIConfig");

const component = "aalert";

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<IAAlertProps>(
  props,
  component,
  config,
  DAAlert
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

const emits = defineEmits<IAAlertEmits>();

const click = (show: boolean) => {
  emits("closea", show);
};
</script>
