<template>
	<div class="flex items-start justify-end flex-wrap gap-8 h-9rem">
		<!-- #region showcase -->
		<adropdowndeco
			panelc="right-0 z-40 w-60 flex justify-center bg-white rounded-lg shadow-lg mt-1 block py-1 px-5 overflow-hidden"
		>
			<template #label>Dropdown Label</template>
			<template #default>
				<p>You can design your dropdown panel here</p>
			</template>
		</adropdowndeco>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	href: "DocDropdownDemo",
};
</script>

<script setup lang="ts"></script>
