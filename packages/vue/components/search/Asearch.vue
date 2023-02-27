<template lang="pug">
div(class="max-w-xs sm:w-full select-none" :class="[cdisplay, cc]")
  label(:for="id" class="sr-only") {{ tr(CASearchName, "search") }}
  div(class="relative")
    input(:value="v"
      type="search"
      :id="id"
      :name="id"
      placeholder="Search"
      maxlength="255"
      :disabled="disabled"
      :aria-disabled="disabled"
      v-bind="$attrs"
      class="disabled:(opacity-50 cursor-default)"
      :class="cvc"
      @input="input($event)"
      @keyup.enter="search($event)")
    div(class="cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center" @click="search()")
      i(class="h-5 w-5" :class="[ci, v ? ciconc : cicondc, cic]")
</template>

<script lang="ts">
export default {
	name: "Asearch",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IASearchProps, IASearchEmits } from "@agufaui/theme";
import { CASearchName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	display: "block",
	i: "i-material-symbols:search-sharp",
	// #endregion props
};

const props = defineProps<IASearchProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASearchProps>(
	props,
	CASearchName,
	defaultPropValues
);

const { cdisplay, cvc, cc, ci, cic, ciconc, cicondc } = computedProperties;

const emits = defineEmits<IASearchEmits>();

let timeout: NodeJS.Timeout;

const input = (e: Event) => {
	if (timeout) {
		clearTimeout(timeout);
	}

	timeout = setTimeout(function () {
		const target = e.target as HTMLInputElement;
		emits("update:v", target.value);
	}, 1000);
};

const search = (e: Event) => {
	const target = e.target as HTMLInputElement;
	target.blur();
	emits("search", target.value);
};

const { tr } = useLocale();
</script>
