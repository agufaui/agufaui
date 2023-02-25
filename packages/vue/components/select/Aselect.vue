<template lang="pug">
fieldset(class="border-0 w-full disabled:(opacity-50 cursor-default)" :disabled="disabled" :class="cc")
  label(v-if="label" :for="id" class="block text-sm font-medium" :class="clabelc") {{label}}
  div(class="relative w-full select-none" :class="{'mt-1': label }" v-on-click-outside="outsideClick")
    button(type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
      class="bg-white h-10 relative w-full outline outline-gray-2 rounded-md shadow-sm pl-3 pr-10 py-2 text-base text-left cursor-default focus:(outline-none ring-2  ring-opacity-50)" 
      :class="cbuttonc"
      @click="show=!show")
      span(class="block truncate" :class="cvc") {{ v?.display ?? v?.name ?? '' }}
      span(class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none")
        span(class="h-5 w-5" :class="[ci, cic]")

    div(class="absolute z-10 mt-1 rounded-md bg-white shadow-lg overflow-y-auto max-h-60 animate-duration-1"
      v-show="show"
      :class="[{'w-full': fullwidth}, show? 'animate-fade-in' : 'animate-fade-out']")
      ul(tabindex="-1" :id="id" role="listbox" aria-labelledby="listbox-label" class="!list-none !px-0 !m-0 !py-1 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm")
        li(role="option" 
          v-for="option, i in options" 
          :key="option.id"
          @click.stop="select(option)"
          @mouseover="handleMouse(true, option)"
          @mouseleave="handleMouse(false, option)" 
          @keyup.enter="select(option)"
          class="!list-none cursor-default select-none relative py-2 pl-3 pr-9"
          :class="[ v?.id === option.id && !mouseHover ? cselectedc : '', coptionc]")
          span(class="font-normal block truncate" :class="[{'font-semibold': v?.id === option.id}, cdisplayc]") {{ option.name }}
          span(class="absolute inset-y-0 right-0 flex items-center pr-4" v-show="v?.id === option.id" :class="svgHover? '' : mouseHover? ccheckc : ''")
            span(class="h-5 w-5 i-ic:baseline-check")
</template>

<script lang="ts">
export default {
	name: "Aselect",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IASelectProps, IASelectEmits, TSelectOption } from "@agufaui/theme";
import { CASelectName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { vOnClickOutside } from "@vueuse/components";
import { ref } from "vue";

let show = ref(false);
let svgHover = ref(false);
let mouseHover = ref(false);

const defaultPropValues = {
	// #region props
	i: "i-heroicons:chevron-up-down-solid",
	// #endregion props
};

const props = defineProps<IASelectProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASelectProps>(
	props,
	CASelectName,
	defaultPropValues
);

const { cc, clabelc, cbuttonc, cvc, ci, cic, cdisplayc, coptionc, cselectedc, ccheckc } =
	computedProperties;

const emits = defineEmits<IASelectEmits>();

const select = (option: TSelectOption) => {
	show.value = false;
	emits("select", option);
};

const outsideClick = () => {
	show.value = false;
};

const handleMouse = (isHover: boolean, option: TSelectOption) => {
	if (props.v?.id === option.id) {
		svgHover.value = isHover;
	}

	mouseHover.value = isHover;
};
</script>
