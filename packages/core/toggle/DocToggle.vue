<template>
	<div class="flex items-center flex-wrap gap-4">
		<!-- #region showcase -->
		<atoggle :v="on" :label="label" @click="on = !on" />
		<atoggle
			:v="on1"
			:label="label1"
			lpos="right"
			buttonon="bg-green-6"
			buttonoff="bg-green-1"
			buttononfocus="focus:ring-green-5"
			@click="on1 = !on1"
		/>
		<atoggle :v="on2" :label="label2" lpos="right" @click="on2 = !on2" />
		<atoggle :v="on3" :label="label3" :disabled="true" @click="on = !on" />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocToggle",
};
</script>

<script setup lang="ts">
import type { IABadgeProps } from "@agufaui/theme";

let on = ref(false);
let on1 = ref(false);
let on2 = ref(false);
let on3 = ref(false);

const label: IABadgeProps = {
	v: "left label",
	t: "label",
};

const label1: IABadgeProps = {
	v: "right label",
	t: "label",
};

const label2: IABadgeProps = {
	i: "i-system-uicons:side-menu",
	v: "right label with icon",
	t: "label",
	spacex: "space-x-0.2",
};

const label3: IABadgeProps = {
	v: "disabled label",
	t: "label",
};
</script>
