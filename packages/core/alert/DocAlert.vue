<template>
	<div class="flex flex-col gap-y-2">
		<!-- #region showcase -->
		<aalert v="Info" :show="true" vc="dark:text-white" />
		<div>
			<aalert v="Info" :show="true" ipos="right" display="inline-flex" vc="dark:text-white" />
		</div>
		<aalert v="Info" :show="true" ipos="right" vc="dark:text-white" />
		<aalert
			:v="text"
			:show="true"
			ic="text-red-6 dark:text-red-5"
			vc="text-red-6 dark:text-red-5"
		/>
		<aalert
			:v="text"
			:show="true"
			ic="text-red-6 dark:text-red-5"
			vc="text-red-6 dark:text-red-5"
			c="border border-red p-4"
		/>
		<aalert :v="text" :show="true" t="red" />
		<aalert v="Success" :show="true" t="green" />
		<aalert v="Warning" :show="true" t="yellow" />
		<aalert v="Info" :show="true" t="gray" />
		<aalert v="Info" :show="true" t="blue" />
		<aalert :v="text" :show="true" t="red" :closable="true" />
		<aalert :show="true" t="red" :closable="true" spacex="space-x-2">
			<template #default>
				<span> Password doesn't meet requirements </span>
				<ul>
					<li>Minimum 8 characters</li>
					<li>At least 1 special character</li>
					<li>At least 1 uppercase character</li>
					<li>At least 1 number</li>
				</ul>
			</template>
		</aalert>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocAlert",
};
</script>

<script setup lang="ts">
const text = ref("Alert");
</script>
