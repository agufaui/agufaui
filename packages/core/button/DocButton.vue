<template lang="pug">
a-button(:text="text" class="m-2")
a-button(text="circle" size="text-xs" round="rounded-1/2" class="m-2")
a-button(text="with icon" u-m="2" icon="i-ph-anchor")
a-button(round="rounded-1/2" px="px-2" u-m="2" icon="i-mdi-alarm")
a-button(text="with icon" u-m="2" size="text-lg" iconSize="text-2xl" icon="i-ph-anchor")
a-button(round="rounded-1/2" px="px-2" u-m="2" size="text-md" icon="i-mdi-alarm")
a-button(text="With loading" u-m="2" icon="i-ph-anchor" :loading="true")
a-button(round="rounded-1/2" px="px-2" u-m="2" icon="i-ph-anchor" :loading="true")
a-button(text="With loading" u-m="2" icon="i-ph-anchor" iconPosition="right" :loading="true" loadingIcon="i-ph-anchor")
a-button(text="test" u-m="2" icon="i-ph-anchor" iconPosition="right" @click="text='hi'")
</template>

<script lang="ts">
export default {
  name: "DocButton",
};
</script>

<script setup lang="ts">
const text = ref("AgufaUI");
</script>
