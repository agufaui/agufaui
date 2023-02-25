<template lang="pug">
div(class="relative inline-block text-left" :class="cc" v-on-click-outside="outsideClick")
  abutton(id="options-menu" aria-haspopup="true" aria-expanded="true"
    :disabled="disabled"
    t="focus"
    :c="cvc"
    :i="ci"
    ic="-mr-1 ml-2 h-5 w-5"
    :ic="cic"
    ipos="right"
    :v="v"
    @click="show = !show")
  div(v-if="show" class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" :class="cpanelc")
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
import { vOnClickOutside } from "@vueuse/components";
import { ref } from "vue";
import Abutton from "../button/Abutton.vue";

let show = ref(false);

const defaultPropValues = {
	// #region props
	i: "i-material-symbols:keyboard-arrow-down",
	// #endregion props
};

const props = defineProps<IADropdownProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADropdownProps>(
	props,
	CADropdownName,
	defaultPropValues
);

const { cc, ci, cic, cvc, cpanelc, citemc } = computedProperties;

const outsideClick = () => {
	show.value = false;
};
</script>
