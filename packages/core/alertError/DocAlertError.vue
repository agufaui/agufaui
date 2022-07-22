<template lang="pug">
a-alert-error(:msg="text")
a-alert-error(:msg="text" :show="true" :error="true")
a-alert-error(:msg="text" :show="true" :error="false")
</template>

<script lang="ts">
export default {
  name: "DocAlertError",
};
</script>

<script setup lang="ts">
const text = ref("AgufaUI");
</script>
