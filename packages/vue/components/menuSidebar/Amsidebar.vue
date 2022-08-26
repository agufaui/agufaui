<template lang="pug">
div(:class="cc")
	div(class="flex flex-col flex-1")
		div(class="flex flex-col flex-1 h-0")
			slot(name="header")
			div(class="flex flex-col flex-1 overflow-y-auto")
				nav(class="flex-1" :class="clinksc")
					div(class="flex-1" v-for="item, i in items" :key="i")
						amdropdown(v-if="'links' in item" :t="cmdropdownt" :mpanelt="cmpanelt" v-bind="{...item, ...$attrs}")
						a(v-else :href="item.href" v-bind="$attrs" class="flex items-center" :class="[clinkc, item.hrefc]")
							div(v-if="item.i" :class="[cic, item.i, item.ic]")
							span(:class="[cvc, item.vc]") {{item.v}}
			slot(name="footer")
</template>

<script lang="ts">
export default {
	name: "Amsidebar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Amdropdown from "../menuDropdown/Amdropdown.vue";
import type { IAMsidebarProps } from "@agufaui/theme";
import { CAMsidebarName } from "@agufaui/theme";
import { CDefaultType } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	mdropdownt: CDefaultType,
	mpanelt: CDefaultType,
	// #endregion props
};

const props = defineProps<IAMsidebarProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMsidebarProps>(
	props,
	CAMsidebarName,
	defaultPropValues
);

const { cc, cmdropdownt, cmpanelt, clinkc, cic, cvc, clinksc } = computedProperties;
</script>
