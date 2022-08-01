<template lang="pug">
a-alert(:msg="text")
a-alert(:msg="text" iclass="text-red-600" mclass="text-pink-600")
a-alert(:msg="text" iclass="text-red-600" mclass="text-pink-600" ipos="right")
a-alert(:msg="text" iclass="text-red-600" mclass="text-pink-600" aclass="border" ipos="right")
a-alert(:msg="text" atype="red")
a-alert(:msg="text" atype="green")
a-alert(:msg="text" atype="yellow")
a-alert(:msg="text" atype="gray")
a-alert(:msg="text" atype="blue")
</template>

<script lang="ts">
export default {
  name: "DocAlert",
};
</script>

<script setup lang="ts">
const text = ref("AgufaUI");
</script>
