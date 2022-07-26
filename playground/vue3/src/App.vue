<script setup lang="ts"></script>

<template lang="pug">
a-button(
  type="button"
  text="typescript"
  ifHover="hover:bg-pink-600"
  ifFocus="focus:ring-red-500"
  :loading="true"
  px="px-4"
)
a-button(
  type="button"
  text="typescript"
  aType="primary"
  ifHover="hover:bg-pink-600"
  ifFocus="focus:ring-red-500"
  :loading="true"
  px="px-4"
)
</template>
