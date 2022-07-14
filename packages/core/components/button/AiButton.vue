<template lang="pug">
button(
  role="button"
  type="button"
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
  :disabled="disabled || loading"
  :class="[px, py, size, color, round, bg, ifHover, ifFocus, {'w-full': full}]"
)
  slot
    div(class="flex justify-center justify-items-center space-x-1.5")
      span(v-if="text && iconPositon==='right'") {{ text }}
      span(v-if="loading")
        div(class="animate-spin preserve-3d text-lg" :class="[loadingIcon, iconColor, iconSize, {'h-full': text !== ''}]")
      span(v-else-if="icon")
        div(:class="[icon, iconColor, iconSize, {'h-full': text !== ''}]")
      span(v-if="text && iconPositon==='left'") {{ text }}
</template>

<script lang="ts">
export default {
  name: "AiButton", // name field must be specified for plugin (global component registration) to work
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps({
  py: { type: String, default: "py-2" },
  px: { type: String, default: "px-4" },
  text: { type: String, default: "" },
  size: { type: String, default: "text-sm" },
  color: { type: String, default: "text-white" },
  round: { type: String, default: "rounded-md" },
  bg: { type: String, default: "bg-blue-600" },
  ifHover: {
    type: String,
    default: "hover:bg-blue-700",
    validator: (newValue: string): boolean => {
      return newValue.startsWith("hover:");
    },
  },
  ifFocus: {
    type: String,
    default: "focus:ring-blue-500",
    validator: (newValue: string): boolean => {
      return newValue.startsWith("focus:");
    },
  },
  full: { type: Boolean, default: false },
  icon: { type: String, default: "" },
  iconColor: { type: String, default: "" },
  iconSize: { type: String, default: "" },
  iconPositon: {
    type: String,
    default: "left",
    validator: (newValue: string): boolean => {
      return newValue === "left" || newValue === "right";
    },
  },
  loading: { type: Boolean, default: false },
  loadingIcon: { type: String, default: "i-eos-icons:loading" },
  disabled: { type: Boolean, default: false },
});
</script>
