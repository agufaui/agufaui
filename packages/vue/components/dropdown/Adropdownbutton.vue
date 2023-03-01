<template lang="pug">
div(v-if="items.length > 0" class="relative" :class="cc" v-on-click-outside="outsideClick")
  div(class="flex")
    abutton(:v="items[0].display" :i="items[0].icon" :disabled="disabled" :c="cvc" :class="items.length > 1 ? 'rounded-none rounded-l-md' : ''" @click="click(items[0].event)")
    abutton(v-if="items.length > 1"
      id="options-menu" aria-haspopup="true" aria-expanded="true"
      :disabled="disabled"
      t=""
      :c="cdropdownc"
      :i="ci"
      :ic="'h-5 w-5 ' + cic"
      @click="show = !show")
  div(v-if="show" class="absolute flex flex-col z-20 mt-1 rounded-md" :class="cpanelc")
    abutton(v-for="item, i in items.slice(1)" :key="i" :v="item.display" :i="item.icon" :c="citemc" :class="[i === 0 ? 'rounded-t-md' : '', i === items.length-2? 'rounded-b-md' : '']" @click="itemClick(items.event)")
</template>

<script lang="ts">
export default {
	name: "Adropdown",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IADropdownButtonProps, IADropdownButtonEmits } from "@agufaui/theme";
import { CADropdownButtonName } from "@agufaui/theme";
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

const props = defineProps<IADropdownButtonProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADropdownButtonProps>(
	props,
	CADropdownButtonName,
	defaultPropValues
);

const { cc, cvc, cdropdownc, ci, cic, cpanelc, citemc } = computedProperties;

const emits = defineEmits<IADropdownButtonEmits>();

const click = (event: string) => {
	show.value = false;
	emits("click", event);
};

const outsideClick = () => {
	show.value = false;
};

const itemClick = (event: string) => {
	show.value = false;
	click(event);
};
</script>
