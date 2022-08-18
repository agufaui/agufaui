<template>
	<!-- #region showcase -->
	<div class="flex flex-wrap gap-2">
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup v="99+" t="rec" c="text-indigo-6" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup v="Vue" t="rec" c="text-white bg-green-5" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup v="Svelte" t="round" c="text-white bg-red-5" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup i="i-mdi:github" t="icon" />
		</span>
		<span class="relative inline-flex items-start">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup v="3" t="circle" c="text-white bg-red-5 h-4.5" />
		</span>
		<span class="relative flex items-start">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup t="circle" c="bg-red-5 h-2" />
		</span>
	</div>
	<div class="flex flex-wrap mt-4 gap-x-7 gap-y-3">
		<span class="relative">
			<abutton
				v="Link"
				c="shadow-md hover:(-translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup v="99+" t="overrec" c="text-indigo-6" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup
				v="New"
				t="overrec"
				c="text-white bg-gradient-to-br from-blue-2 to-green-5 shadow-md shadow-green-3"
			/>
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup
				v="hot"
				t="overround"
				c="text-white bg-gradient-to-br from-purple-2 to-red-5 shadow-md shadow-red-3"
			/>
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="shadow-md hover:(-translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup i="i-mdi:github" t="overicon" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup
				v="3"
				t="overcircle"
				c="text-white bg-gradient-to-br from-red-2 to-red-5 shadow-md shadow-red-3 h-4.5"
			/>
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup t="overdot" c="bg-red-5" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup t="overdot" c="bg-red-5 animate-pulse" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup t="overdot" c="bg-red-5 animate-ping !-translate-x-65%" />
		</span>
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup t="over" class="!-translate-x-10%">
				<abadge
					v="github"
					t="round"
					c="text-white bg-gradient-to-br from-purple-2 to-black shadow-md shadow-gray-4"
				/>
				<abadge
					v="vue"
					t="round"
					c="text-white bg-gradient-to-br from-blue-2 to-green-5 shadow-md shadow-green-3"
				/>
				<abadge
					v="svelte"
					t="round"
					c="text-white bg-gradient-to-br from-purple-2 to-red-5 shadow-md shadow-red-3"
				/>
			</asup>
		</span>
	</div>
	<div class="flex my-5">
		<span class="relative">
			<abutton
				v="Link"
				c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			/>
			<asup t="over" class="!-translate-x-5%">
				<abadge
					v="github"
					t="round"
					c="text-white bg-gradient-to-br from-purple-2 to-black shadow-md shadow-gray-4"
				/>
				<abadge
					v="vue"
					t="round"
					c="text-white bg-gradient-to-br from-blue-2 to-green-5 shadow-md shadow-green-3"
				/>
				<abadge
					v="svelte"
					t="round"
					c="text-white bg-gradient-to-br from-purple-2 to-red-5 shadow-md shadow-red-3"
				/>
			</asup>
			<asub t="over" class="!-translate-x-5%">
				<abadge
					v="New"
					t="round"
					c="text-white bg-gradient-to-br from-indigo-2 to-blue-5 shadow-md shadow-blue-4"
				/>
				<abadge
					v="99+"
					t="round"
					c="text-white bg-gradient-to-br from-orange-2 to-amber-5 shadow-md shadow-amber-3"
				/>
				<abadge
					v="Hot"
					t="round"
					c="text-white bg-gradient-to-br from-purple-2 to-red-5 shadow-md shadow-red-3"
				/>
			</asub>
		</span>
	</div>
	<!-- #endregion showcase -->
</template>

<script lang="ts">
export default {
	name: "DocSup",
};
</script>
