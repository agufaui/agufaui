<template lang="pug">
adropdowndeco(v-bind="{...deco, ...$attrs}" controlt="res" :disabled="disabled" :panelc="cpanelc")
  template(#label) {{ tr(CADropdownSelectName, "display") }}
  template(#default)
    div(v-for="item in items" :key="item.key" class="flex justify-start items-center text-ellipsis cursor-pointer" :class="citemc")
      div(:class="ckeyc")
        acheckbox(:checked="true" @click="click(item.key)")
      div(class="select-none" :class="cvaluec") {{ item.value }}
</template>

<script lang="ts">
export default {
	name: "Adropdownselect",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IADropdownSelectProps, IADropdownSelectEmits } from "@agufaui/theme";
import { CADropdownSelectName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";
import { ref } from "vue";
import Acheckbox from "../checkbox/Acheckbox.vue";
import Adropdowndeco from "./Adropdowndeco.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IADropdownSelectProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADropdownSelectProps>(
	props,
	CADropdownSelectName,
	defaultPropValues
);

const { cc, cbuttonc, cpanelc, citemc, ckeyc, cvaluec } = computedProperties;

const emits = defineEmits<IADropdownSelectEmits>();

const click = (key: string) => {
	emits("toggle", key);
};

const { tr } = useLocale();
</script>
