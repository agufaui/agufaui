<template lang="pug">
div(:class="cc" v-show="show")
	div(class="fixed inset-0 flex z-100" @click.stop.prevent="click()")
		div(class="fixed inset-0" aria-hidden="true")
			div(class="absolute inset-0" :class="coverlayc")
			button(v-if="cclosei" class="flex items-center justify-center absolute top-0 right-0" :class="cclosec")
				span(class="sr-only") {{ tr(CAMmsidebarName, "close") }}
				span(:class="[cclosei, ccloseic]")
		div(class="relative flex-1 flex flex-col" :class="csidebarc")
			slot(name="header")
			div(class="flex flex-col flex-1 overflow-y-auto")
				nav(class="flex-1" :class="clinksc")
					div(class="flex-1" v-for="item, i in items" :key="i")
						amdropdown(v-if="'links' in item" :t="cmdropdownt" :mpanelt="cmpanelt" v-bind="{...item, ...$attrs}")
						a(v-else :href="item.href" v-bind="$attrs" class="flex items-center" :class="[clinkc, item.hrefc]")
							div(v-if="item.i" :class="[cic, item.i, item.ic]")
							span(:class="[cvc, item.vc]") {{item.v}}
			slot(name="footer")
		div(class="flex-shrink-0 w-14" aria-hidden="true")
</template>

<script lang="ts">
export default {
	name: "Ammmsidebar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Amdropdown from "../menuDropdown/Amdropdown.vue";
import type { IAMmsidebarProps, IAMmsidebarEmits } from "@agufaui/theme";
import { CAMmsidebarName } from "@agufaui/theme";
import { CDefaultType } from "@agufaui/config";
import { useVue, useLocale } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	mdropdownt: CDefaultType,
	mpanelt: CDefaultType,
	// #endregion props
};

const props = defineProps<IAMmsidebarProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMmsidebarProps>(
	props,
	CAMmsidebarName,
	defaultPropValues
);

const {
	cc,
	coverlayc,
	cclosec,
	cclosei,
	ccloseic,
	csidebarc,
	cmdropdownt,
	cmpanelt,
	clinksc,
	clinkc,
	cic,
	cvc,
} = computedProperties;

const emits = defineEmits<IAMmsidebarEmits>();

const click = () => {
	emits("close");
};

const { tr } = useLocale();
</script>
