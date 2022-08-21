<script setup lang="ts">
import { isRef, ref, inject } from "vue";
import type { IConfig } from "@agufaui/vue";
import { CConfigProvideName } from "@agufaui/vue";

const open = ref(false);

const config = inject<IConfig>(CConfigProvideName);

const click = () => {
	const locale = config?.locale;
	if (isRef(locale)) {
		if (locale.value === "en") {
			console.log("en");
			locale.value = "zh-cn";
		} else {
			console.log("zh-cn");
			locale.value = "en";
		}
	}
};
</script>

<template lang="pug">
abutton(
  type="button"
  t="default"
  v="typescript"
  c="hover:bg-pink-600 focus:ring-red-500 px-4"
  u-m="2"
  @click="click"
)
abutton(
  type="button"
  t="primary"
  v="typescript"
  c="hover:bg-pink-600 focus:ring-red-500 px-4"
  u-m="2"
  :loading="true"
)
<amobile :open="open" @click="open = !open" />
</template>
