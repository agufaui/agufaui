<template lang="pug">
div(class="shadow rounded-lg flex select-none" v-on-click-outside="outsideClick" :class="cc")
  div(class="relative")
    adropdowncontrol(@click.stop="open = !open" :t="controlt ?? 'default'" :disabled="disabled" v-bind="{...control, ...$attrs}" :c="cbuttonc")
      slot(name="label")
    div(v-show="open"
      class="absolute"
      :class="cpanelc")
      slot
</template>

<script lang="ts">
export default {
	name: "Adropdowndeco",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IADropdownDecoProps } from "@agufaui/theme";
import { CADropdownDecoName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { vOnClickOutside } from "@vueuse/components";
import { ref } from "vue";
import Adropdowncontrol from "./Adropdowncontrol.vue";

let open = ref(false);

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IADropdownDecoProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IADropdownDecoProps>(
	props,
	CADropdownDecoName,
	defaultPropValues
);

const { cc, cbuttonc, cpanelc } = computedProperties;

const outsideClick = () => {
	open.value = false;
};
</script>
