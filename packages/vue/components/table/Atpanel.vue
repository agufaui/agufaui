<template lang="pug">
table(class="min-w-full leading-normal" v-bind="$attrs" :class="cc")
  thead
    tr
      th(v-if="multiSelect" scope="col" class="sticky top-0" :class="cmultiSelectc")
        acheckbox(:v="allSelect" @click="handleEvent('selectall', $event)")
      th(
        scope="col"
        v-if="headings"
        v-for="heading, i in headings"
        :key="heading.key + i"
        :ref="heading.key"
        class="sticky"
        :class="[heading.key, cheadingc]"
        :id="heading.key"
        @click.prevent.stop="handleEvent('sort', heading)"
      )
        div(class="flex items-center justify-between space-x-2")
          span {{ heading.display }}
          div(class="flex flex-col justify-center" v-if="heading.field" :class="heading.direction ? cdirc : ''")
            i(class="items-start" :class="[{'hidden': heading.direction === 'desc'}, {'-mb-0.5': heading.direction === ''}, cdesci, cdescc]")
            i(class="items-end" :class="[{'hidden': heading.direction === 'asc'}, ci, cic]")
      th(
        scope="col"
        v-if="actions"
        :class="cactionsc"
      )
        span.sr-only {{ tr(CATpanelName, "actions") }}
  tbody
    tr(v-if="loading")
      td(class="py-2" :colspan="headings.length+2")
        div(class="flex justify-center")
          i(class="animate-spin" :class="[cloadi, cloadc]")
    tr(v-else-if="!items || items.length === 0")
      td(class="text-center align-middle py-2" :colspan="headings.length+2" :class="cemptyc")
        slot(name="empty") {{ tr(CATpanelName, "empty") }}
    tr(v-else v-for="item, i in items" :key="item.id?item.id:item + i" :ref="refItem")
      td(v-if="multiSelect" :class="cselectc")
        acheckbox(@click="handleEvent('selectrow', item.id?item.id:item)" inputc="rowCheckbox")
      td(
        v-if="isScalarArray"
        class="select-text"
        :class="[headings[0].key, cnonObjectsc]"
      )
        span {{ item }}
      td(
        v-else
        v-for="key, j in Object.keys(item)"
        :key="item.id + i + j"
        class="select-text"
        :class="[headings[j].key, cobjectsc]"
      )
        div(v-if="headings[j].type")
          button(v-if="headings[j].type === 'event'" @click="handleOpe({ type: headings[j].event, value: item })" :class="cobjectEventc") {{ item[key] }}
          a(v-else-if="headings[j].type === 'link'" :href="headings[j].href+item[key]" :class="cobjectLinkc") {{ item[key] }}
        span(v-else) {{ printItem(item[key]) }}
      td(
        v-if="actions"
        :class="cactionc"
      )
        adropdownbutton(v-if="actions.items.length > 0" v-bind="actions" @click="handleOpe({type: $event, value: item})")
</template>

<script lang="ts">
export default {
	name: "Atpanel",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IATpanelProps, IATpanelEmits, TTpanelEmit } from "@agufaui/theme";
import { CATpanelName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";
import { ref, withDefaults, watch } from "vue";
import Acheckbox from "../checkbox/Acheckbox.vue";
import Adropdownbutton from "../dropdown/Adropdownbutton.vue";

let allSelect = ref(false);

const defaultPropValues = {
	// #region props
	i: "i-material-symbols:keyboard-arrow-down-rounded",
	desci: "i-material-symbols:keyboard-arrow-up-rounded",
	loadi: "i-mingcute:loading-fill",
	// #endregion props
};

const props = withDefaults(defineProps<IATpanelProps>(), {
	refItem: "record",
});

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IATpanelProps>(
	props,
	CATpanelName,
	defaultPropValues
);

const {
	cc,
	cmultiSelectc,
	cheadingc,
	cactionsc,
	cemptyc,
	cselectc,
	cnonObjectsc,
	cobjectsc,
	cobjectEventc,
	cobjectLinkc,
	cactionc,
	cdirc,
	ci,
	cic,
	cdesci,
	cdescc,
	cloadi,
	cloadc,
} = computedProperties;

const emits = defineEmits<IATpanelEmits>();

const handleOpe = (value: TTpanelEmit) => {
	emits("ope", value);
};

const handleEvent = (type: string, value: any) => {
	switch (type) {
		case "selectall":
			let columns: NodeListOf<HTMLInputElement> = document.querySelectorAll(".rowCheckbox");
			allSelect.value = !allSelect.value;

			if (allSelect.value) {
				columns.forEach((column) => {
					column.checked = true;
				});
			} else {
				columns.forEach((column) => {
					column.checked = false;
				});
			}
			emits("action", { type: type, value: value });
			break;
		case "selectrow":
			emits("action", { type: type, value: value });
			break;
		case "sort":
			if (!value.field) {
				return;
			}
			emits("action", { type: type, value: value });
			break;
		default:
			return;
	}
};

const printItem = (item: any) => {
	if (Array.isArray(item)) {
		return item.join(" ");
	}

	return item;
};

watch(
	() => props.selectAll,
	(selectAll) => {
		allSelect.value = selectAll ? true : false;
	},
	{ immediate: true }
);

const { tr } = useLocale();
</script>
