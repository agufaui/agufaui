<template lang="pug">
div(class="mx-auto px-4 py-8 w-full sm:px-8" :class="cc")
  div(class="flex my-2 w-full justify-between items-center")
    div(class="my-2 flex justify-start")
      div(class="flex items-center flex-wrap sm:mb-0 sm:space-x-1")
        aselectoption(v-if="showPages" v-bind="recordsPerPageOption" @select="handleAction({ type: 'recordsPerPageChange', value: $event })")
          | {{ tr(CATableName, 'show') }}
        span(v-if="showPages") {{ tr(CATableName, 'records') }}
    div(class="my-2 flex justify-start space-x-1")
      abutton(
        v-if="ifNew"
        v-bind="newButton"
        @click="handleNew($event)"
      ) {{ tr(CATableName, 'new') }}
      abutton(
        v-if="ifDelete"
        v-bind="deleteButton"
        @click="handleDelete($event)"
        :disabled="numSelectedRows === 0"
      ) {{ tr(CATableName, 'delete') }}
      slot(name="actions")
      adropdownselect(v-bind="showHideColumnsOption" @toggle="handleAction({ type: 'toggleColumn', value: $event })")
      adropdowncontrol(v-if="ifFilter" @click.stop="open = !open") {{ tr(CATableName, 'filters') }}
  div(v-show="open" class="outline outline-gray-2 p-2 mb-2 space-y-2 rounded-md shadow flex items-center flex-wrap")
    slot(name="filterPanel")
  div(v-if="filters?.length > 0" class="outline outline-gray-2 rounded-md p-1 mb-2 flex space-x-2 items-center flex-wrap")
    atag(v-for="f, i in filters" :key="f.field+i" v-bind="tagProps" :v="f.display+': '+f.displayValue" @close="handleRemoveFilter(f)")
  aalertError(class="my-2" v-bind="alert" @close="handleCloseAlert($event)")
  div(class="flex justify-between items-center mb-2")
    span(class="ml-1") {{ tr(CATableName, 'display') }} {{displayOffset}}-{{displayEnd}}  {{ tr(CATableName, 'of') }} {{totalRecords}}  {{ tr(CATableName, 'records') }}
    asearch(v-if="ifSearch" @search="handleAction({ type: 'search', value: $event })" @update:v="handleAction({ type: 'searchInput', value: $event })")
  div(class="overflow-x-auto")
    div(class="inline-block min-w-full shadow rounded-lg select-none z-0")
      atpanel(ref="panel" v-bind="panel"
        @ope="handleOpe($event)"
        @action="handleAction($event)")
  apagination(v-if="showPages" v-bind="pagination" @change="handleAction({ type: 'pageChange', value: $event })")
</template>

<script lang="ts">
export default {
	name: "Atable",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IATableProps, IATableEmits, TTpanelEmit, TTableFilter } from "@agufaui/theme";
import { CATableName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";
import { ref, computed, EmitsOptions } from "vue";
import Apagination from "./Apagination.vue";
import Atpanel from "./Atpanel.vue";
import Adropdownselect from "../dropdown/Adropdownselect.vue";
import Adropdowncontrol from "../dropdown/Adropdowncontrol.vue";
import Asearch from "../search/Asearch.vue";
import Atag from "../tag/Atag.vue";
import Aselectoption from "../select/Aselectoption.vue";
import Abutton from "../button/Abutton.vue";
import AalertError from "../alertError/AalertError.vue";

let open = ref(false);

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IATableProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IATableProps>(
	props,
	CATableName,
	defaultPropValues
);

const { cc } = computedProperties;

const emits = defineEmits<IATableEmits>();

const handleOpe = (value: TTpanelEmit) => {
	emits("ope", value);
};

const handleAction = (value: TTpanelEmit) => {
	emits("action", value);
};

const handleNew = (e: MouseEvent) => {
	emits("new", e);
};

const handleDelete = (e: MouseEvent) => {
	emits("delete", e);
};

const handleCloseAlert = (e: MouseEvent) => {
	emits("closeAlert", e);
};

const handleRemoveFilter = (e: TTableFilter) => {
	emits("removeFilter", e);
};

const displayOffset = computed(() => {
	if ((props.offset ?? 0) < (props.totalRecords ?? 0)) {
		return props.offset! + 1;
	}

	return props.offset;
});

const displayEnd = computed(() => {
	const end = props.offset + props.recordsPerPageOption?.v;
	if (end > (props.totalRecords ?? 0)) {
		return props.totalRecords;
	}

	return end;
});

const { tr } = useLocale();
</script>
