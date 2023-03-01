<template lang="pug">
adropdowndeco(v-bind="{...deco, ...$attrs}" :disabled="disabled" :panelc="cpanelc")
  template(#label) {{ v }}
  template(#default)
    div(class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu")
      a(:href="item.href" class="block" :class="citemc" role="menuitem" v-for="item, i in items" :key="i" @click.stop="show=!show") {{item.label}}
</template>

<script lang="ts">
export default {
	name: "Adropdown",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IADropdownProps } from "@agufaui/theme";
import { CADropdownName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import Adropdowndeco from "./Adropdowndeco.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IADropdownProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADropdownProps>(
	props,
	CADropdownName,
	defaultPropValues
);

const { cc, cpanelc, citemc } = computedProperties;
</script>
