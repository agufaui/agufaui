<template lang="pug">
div(
  v-if="cshow"
  v-bind="$attrs"
  u-flex="~"
  u-justify="items-start"
  :class="[cspacex, caclass]")
  div(v-if="cipos === 'left'" :class="[cicon, ciclass]")
  span(class="block" :class="cmclass")
    slot {{ msg }}
  div(v-if="cipos === 'right'" :class="[cicon, ciclass]")
  div(v-if="ccloseable" class="i-typcn:delete" u-flex="shrink-0" u-text="xl gray-400" u-cursor="pointer" @click="click(false)")
</template>

<script lang="ts">
export default {
  name: "AAlert",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAAlertProps, IAAlertEmits } from "@agufaui/theme";
import { CAAlertName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { aUseVueComponent } from "@agufaui/use";
import { inject } from "vue";

const props = defineProps<IAAlertProps>();

let config = inject<IConfig>(CConfigProvideName);

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<IAAlertProps>(props, CAAlertName, config);

const { cshow, caclass, cicon, cipos, ciclass, cmclass, ccloseable, cspacex } = computedProperties;

const emits = defineEmits<IAAlertEmits>();

const click = (show: boolean) => {
  emits("closea", show);
};
</script>
