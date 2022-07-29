<script setup lang="ts"></script>

<template lang="pug">
a-button(
  type="button"
  text="typescript"
  hover="hover:bg-pink-600"
  focus="focus:ring-red-500"
  :loading="true"
  px="px-4"
)
AButton(
  type="button"
  text="typescript"
  aType="primary"
  hover="hover:bg-pink-600"
  focus="focus:ring-red-500"
  :loading="true"
  px="px-4"
)
</template>
