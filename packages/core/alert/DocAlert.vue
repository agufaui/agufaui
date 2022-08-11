<template>
	<!-- #region showcase -->
	<a-alert msg="Info" :show="true" aclass="my-2" />
	<a-alert msg="Info" :show="true" ipos="right" aclass="my-2" />
	<a-alert :msg="text" :show="true" iclass="text-red-600" mclass="text-pink-600" aclass="my-2" />
	<a-alert
		:msg="text"
		:show="true"
		iclass="text-red-600"
		mclass="text-pink-600"
		aclass="border border-red p-4 my-2"
	/>
	<a-alert :msg="text" :show="true" atype="red" aclass="my-2" />
	<a-alert msg="Success" :show="true" atype="green" aclass="my-2" />
	<a-alert msg="Warning" :show="true" atype="yellow" aclass="my-2" />
	<a-alert msg="Info" :show="true" atype="gray" aclass="my-2" />
	<a-alert msg="Info" :show="true" atype="blue" aclass="my-2" />
	<a-alert :msg="text" :show="true" atype="red" :closable="true" aclass="my-2" />
	<a-alert :show="true" atype="red" :closable="true" spacex="space-x-2" aclass="my-2">
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
</template>

<script lang="ts">
export default {
	name: "DocAlert",
};
</script>

<script setup lang="ts">
const text = ref("Alert");
</script>
