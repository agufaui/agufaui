<template>
	<div class="flex items-center flex-wrap gap-2">
		<!-- #region showcase -->
		<atag v="Monitor" t="rec" c="text-white bg-black" />
		<atag v="< $10000" t="rec" c="text-white bg-gradient-to-br from-blue-2 to-green-5" />
		<atag v="3 bathrooms" t="rec" c="text-white bg-red-5" />
		<atag
			v="Computer"
			t="round"
			c="text-white bg-gradient-to-br from-purple-2 to-black shadow-md shadow-gray-4"
		/>
		<atag
			v="> $5000"
			t="round"
			c="text-white bg-gradient-to-br from-blue-2 to-green-5 shadow-md shadow-green-3"
		/>
		<atag
			v="New"
			t="round"
			c="text-white bg-gradient-to-br from-purple-2 to-red-5 shadow-md shadow-red-3"
		/>
		<atag
			v="Memory > 128gb"
			t="round"
			pos="right"
			c="text-white bg-gradient-to-br from-purple-2 to-amber-5 shadow-md shadow-amber-3"
		/>
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocBadge",
};
</script>
