<script setup lang="ts">
import { AButton } from "@agufaui/vue";
</script>

<template lang="pug">
a-button(
  type="button"
  text="typescript"
  if-hover="hover:bg-pink-600"
  if-focus="focus:ring-red-500"
  u-m="2"
  :loading="true"
  px="px-4"
)
a-button(
  type="button"
  text="typescript"
  aType="primary"
  hover="hover:bg-pink-600"
  focus="focus:ring-red-500"
  :loading="true"
  px="px-4"
)
</template>
