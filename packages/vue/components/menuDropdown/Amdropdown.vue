<template lang="pug">
div(:class="cc" v-bind="$attrs")
  div(class="flex items-center justify-between" :class="[ctitlesc, expand ? '' : 'cursor-pointer']" @click.stop="if (!expand) open = !open;")
    span(class="flex items-center")
      span(v-if="ci" :class="[ci, cic]")
      span(:class="cvc") {{ v }}
        slot
          asup(v-if="badges" :c="cbadgesc")
            abadge(v-for="badge, i in badges" :key="i" v-bind="badge")
    span(v-if="!expand" class="flex-shrink-0 transition-transform duration-200" :class="[carrowi, open? 'rotate-180' : 'rotate-0', carrowic]")
  div(v-if="open || expand" :class="clinksc")
    component(v-for="item, i in items" :key="i" :is="getComponent(item.name)" v-bind="{...item.props, ...item.attrs}")
</template>

<script lang="ts">
export default {
	name: "Amdropdown",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMdropdownProps } from "@agufaui/theme";
import { CAMdropdownName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { ref, defineAsyncComponent } from "vue";
import Asup from "../superscript/Asup.vue";
import Abadge from "../badge/Abadge.vue";

let open = ref(false);

const defaultPropValues = {
	// #region props
	arrowi: "i-ion:arrow-down-b",
	// #endregion props
};

const props = defineProps<IAMdropdownProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMdropdownProps>(
	props,
	CAMdropdownName,
	defaultPropValues
);

const { cc, ci, cic, cvc, ctitlesc, carrowi, carrowic, clinksc, cbadgesc } = computedProperties;

const getComponent = (name: string) => {
	if (name === "dropdown") {
		return "Amdropdown";
	}

	const subName = name.charAt(0).toUpperCase() + name.substring(1);
	return defineAsyncComponent(() => import(`../menu${subName}/Am${name}.vue`));
};
</script>
