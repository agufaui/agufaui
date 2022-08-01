<template lang="pug">
button(
  role="button"
  :type="ctype ?? 'button'"
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
  :disabled="cdisabled || cloading"
  :class="caclass"
)
  slot
    div(class="flex justify-center items-center" :class="cicon || cloading ? cspacex : ''")
      span(v-if="text && cipos==='right'") {{ text }}
      span(v-if="cloading")
        div(class="animate-spin preserve-3d text-lg" :class="[clicon ?? 'i-eos-icons:loading', clclass]")
      span(v-else-if="cicon")
        div(:class="[cicon, ciclass]")
      span(v-if="text && cipos==='left'") {{ text }}
</template>

<script lang="ts">
export default {
  name: "AButton", // name field must be specified for plugin (global component registration) to work
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAButtonProps, IAButtonEmits } from "@agufaui/theme";
import { CAButtonName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { aUseVueComponent } from "@agufaui/use";
import { inject } from "vue";

const props = defineProps<IAButtonProps>();

let config = inject<IConfig>(CConfigProvideName);

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<IAButtonProps>(
  props,
  CAButtonName,
  config
);

const { ctype, cdisabled, caclass, cicon, cipos, ciclass, cloading, clicon, clclass, cspacex } =
  computedProperties;

const emits = defineEmits<IAButtonEmits>();

const click = (e: MouseEvent) => {
  emits("click", e);
};
</script>
