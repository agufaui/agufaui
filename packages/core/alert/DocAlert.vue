<template lang="pug">
a-alert(:msg="text")
a-alert(:msg="text" iconColor="text-red-600" color="text-pink-600")
a-alert(:msg="text" iconColor="text-red-600" color="text-pink-600" icon-position="right")
a-alert(:msg="text" iconColor="text-red-600" color="text-pink-600" a-class="border" icon-position="right")
a-alert(:msg="text" a-type="red")
a-alert(:msg="text" a-type="green")
a-alert(:msg="text" a-type="yellow")
a-alert(:msg="text" a-type="gray")
a-alert(:msg="text" a-type="blue")
</template>

<script lang="ts">
export default {
  name: "DocAlert",
};
</script>

<script setup lang="ts">
const text = ref("AgufaUI");
</script>
