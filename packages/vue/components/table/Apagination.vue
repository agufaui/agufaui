<template lang="pug">
nav(v-if="totalPages > 1" class="flex items-center" :class="[goto ? cspacex : '', gotoPos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]")
  div(v-if="goto" :class="cgotoc")
    ainput(type="number" :label="tr(CAPaginationName, 'goto')" t="inlineblock" vc="max-w-4rem" @blur="change($event)")
  div(class="flex items-center justify-between" :class="cpaginationc")
    div(class="-mt-px flex-1 flex")
      a(@click="change(curPage-1)" v-if="curPage > 1" class="cursor-pointer" :class="cprec")
        i(:class="[clefti, cic]")
        slot(name="previous") {{ tr(CAPaginationName, "previous") }}
    div(class="-mt-px md:flex")
      a(@click="change(n)" v-for="n in firstPages" :key="n" class="cursor-pointer" :class="[getClass(n), cpagec]") {{ n }}
      span(v-if="leftMark" :class="cmarkc") ...
      a(@click="change(n)" v-for="n in midPages" :key="n" class="cursor-pointer" :class="[getClass(n), cpagec]") {{ n }}
      span(v-if="rightMark" :class="cmarkc") ...
      a(@click="change(n)" v-for="n in lastPages" :key="n" class="cursor-pointer" :class="[getClass(n), cpagec]") {{ n }}
    div(class="-mt-px flex-1 flex justify-end")
      a(@click="change(curPage+1)" v-if="curPage < totalPages" class="cursor-pointer" :class="cprec")
        slot(name="next") {{ tr(CAPaginationName, "next") }}
        i(:class="[ci, cic]")
</template>

<script lang="ts">
export default {
	name: "Apagination",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAPaginationProps, IAPaginationEmits } from "@agufaui/theme";
import { CAPaginationName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import Ainput from "../input/Ainput.vue";

const defaultPropValues = {
	// #region props
	i: "i-material-symbols:arrow-right-alt-rounded",
	lefti: "i-material-symbols:line-start-arrow-notch-rounded",
	spacex: "space-x-2",
	totalPages: 1,
	numPagesShow: 3,
	// #endregion props
};

const props = withDefaults(defineProps<IAPaginationProps>(), {
	totalPages: 1,
	numPagesShow: 3,
});

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAPaginationProps>(
	props,
	CAPaginationName,
	defaultPropValues
);

const { cc, cspacex, cgotoc, cpaginationc, cvc, covc, cprec, cpagec, cmarkc, ci, clefti, cic } =
	computedProperties;

let curPage = ref(1);
let curNumShow = ref<number>(props.numPagesShow);
let firstPages = reactive<number[]>([]);
let midPages = reactive<number[]>([]);
let lastPages = reactive<number[]>([]);
let leftMark = ref(true);
let rightMark = ref(true);
const sm = 640;
const md = 768;
const lg = 1024;
const xl = 1280;

const emits = defineEmits<IAPaginationEmits>();

const change = (page: string | number) => {
	if (!page) return;

	let pageNum: number;
	if (typeof page === "string") {
		pageNum = parseInt(page);
	} else {
		pageNum = page;
	}

	if (curPage.value === pageNum) {
		return;
	}

	if (pageNum > props.totalPages) {
		curPage.value = props.totalPages;
	} else if (pageNum < 1) {
		curPage.value = 1;
	} else {
		curPage.value = pageNum;
	}

	emits("change", pageNum);
};

const { tr } = useLocale();

const getFirstPage = (): number => {
	if (curPage.value === 1) {
		return curPage.value;
	} else {
		return curPage.value - 1;
	}
};

const getClass = (page: number): string => {
	if (curPage.value === page) {
		return cvc.value ?? "";
	} else {
		return covc.value;
	}
};

onMounted(() => {
	window.addEventListener("resize", handleWindowsResize);
});

onUnmounted(() => {
	window.removeEventListener("resize", handleWindowsResize);
});

const handleWindowsResize = () => {
	setCurNumPageShow(props.numPagesShow);
};

const setCurNumPageShow = (num: number) => {
	let w: number = sm;

	if (typeof document !== "undefined" || typeof window !== "undefined") {
		w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	}

	if (w >= xl) {
		curNumShow.value = num;
	} else if (md <= w && w < xl) {
		if (num < 4) {
			curNumShow.value = num;
		} else {
			curNumShow.value = 3;
		}
	} else {
		curNumShow.value = 1;
	}

	populateArrays(props.totalPages, curNumShow.value, curPage.value);
};

const populateArrays = (total: number, num: number, current: number) => {
	firstPages = [];
	midPages = [];
	lastPages = [];

	if (total <= num * 2) {
		firstPages = Array.from({ length: total }, (_, i) => i + 1);
		leftMark.value = false;
		rightMark.value = false;
		return;
	}

	firstPages = Array.from({ length: num }, (_, i) => i + 1);

	const lastlow = total - num + 1;

	lastPages = Array.from({ length: num }, (_, i) => lastlow + i);

	const half = (num - 1) / 2;

	var midlow = current - half;
	var midhigh = current + half;

	if (midlow >= lastlow) {
		leftMark.value = true;
		rightMark.value = false;
		return;
	}

	if (midhigh <= num) {
		leftMark.value = false;
		rightMark.value = true;
		return;
	}

	leftMark.value = true;
	rightMark.value = true;

	if (midlow <= num + 1) {
		midlow = num + 1;
		leftMark.value = false;
	}

	if (midhigh >= lastlow - 1) {
		midhigh = lastlow - 1;
		rightMark.value = false;
	}

	midPages = Array.from({ length: midhigh - midlow + 1 }, (_, i) => midlow + i);
};

watch(
	() => props.totalPages,
	(totalPages) => {
		populateArrays(totalPages, curNumShow.value, curPage.value);
	},
	{ immediate: true }
);

watch(
	() => props.numPagesShow,
	(numPagesShow) => {
		setCurNumPageShow(numPagesShow);
	},
	{ immediate: true }
);

watch(
	() => curPage.value,
	(curPage) => {
		populateArrays(props.totalPages, curNumShow.value, curPage);
	},
	{ immediate: true }
);

watch(
	() => props.currentPage,
	(currentPage) => {
		curPage.value = currentPage ?? curPage.value;
	},
	{ immediate: true }
);
</script>
