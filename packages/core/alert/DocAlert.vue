<template>
	<div class="flex flex-col gap-y-2">
		<!-- #region showcase -->
		<a-alert msg="Info" :show="true" mclass="dark:text-white" />
		<div>
			<a-alert
				msg="Info"
				:show="true"
				ipos="right"
				display="inline-flex"
				mclass="dark:text-white"
			/>
		</div>
		<a-alert msg="Info" :show="true" ipos="right" mclass="dark:text-white" />
		<a-alert
			:msg="text"
			:show="true"
			iclass="text-red-6 dark:text-red-5"
			mclass="text-red-6 dark:text-red-5"
		/>
		<a-alert
			:msg="text"
			:show="true"
			iclass="text-red-6 dark:text-red-5"
			mclass="text-red-6 dark:text-red-5"
			aclass="border border-red p-4"
		/>
		<a-alert :msg="text" :show="true" atype="red" />
		<a-alert msg="Success" :show="true" atype="green" />
		<a-alert msg="Warning" :show="true" atype="yellow" />
		<a-alert msg="Info" :show="true" atype="gray" />
		<a-alert msg="Info" :show="true" atype="blue" />
		<a-alert :msg="text" :show="true" atype="red" :closable="true" />
		<a-alert :show="true" atype="red" :closable="true" spacex="space-x-2">
			<template #default>
				<span> Password doesn't meet requirements </span>
				<ul>
					<li>Minimum 8 characters</li>
					<li>At least 1 special character</li>
					<li>At least 1 uppercase character</li>
					<li>At least 1 number</li>
				</ul>
			</template>
		</a-alert>
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
