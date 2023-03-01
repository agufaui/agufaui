<!-- #region showcase -->
<template>
	<div class="flex space-x-4 w-full doc">
		<abutton
			v="Show Top"
			c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			@click="showPos('top')"
		/>
		<abutton
			v="Show Bottom"
			c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			@click="showPos('bottom')"
		/>
		<abutton
			v="Show Left"
			c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			@click="showPos('left')"
		/>
		<abutton
			v="Show Right"
			c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			@click="showPos('right')"
		/>
		<adrawer :show="show" :pos="pos" @close="show = false">
			<nav class="flex flex-col flex-1 overflow-y-auto h-full bg-gray-8 min-w-14rem">
				<ampanel v-bind="mpanel" />
			</nav>
		</adrawer>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuMobileSidebar",
};
</script>

<script setup lang="ts">
import { TPos, IAMpanelProps } from "@agufaui/theme";

const close = () => {
	console.log("close");
};

let show = ref(false);
let pos = ref<TPos>("left");

const showPos = (p: string) => {
	show.value = true;
	pos.value = p as TPos;
};

const mpanel: IAMpanelProps = {
	t: "dark",
	sections: [
		{
			items: [
				{
					name: "dropdown",
					props: {
						v: "Sites",
						i: "i-majesticons:sitemap",
						t: "sidebarDark",
						items: [
							{
								name: "link",
								props: {
									v: "Google",
									t: "sidebarDark",
									href: "https://google.com",
									i: "i-logos:google-icon",
									subtitle: "Google Site",
								},
							},
							{
								name: "link",
								props: {
									v: "Github",
									t: "sidebarDark",
									href: "https://github.com",
									i: "i-logos:github-icon",
									ic: "bg-gray-2 rounded-lg",
								},
							},
						],
					},
				},
				{
					name: "dropdown",
					props: {
						v: "Another Sites",
						i: "i-dashicons:admin-site",
						t: "sidebarDark",
						items: [
							{
								name: "link",
								props: {
									v: "Google",
									t: "sidebarDark",
									href: "https://google.com",
									i: "i-logos:google-icon",
									subtitle: "Google Site",
								},
							},
							{
								name: "link",
								props: {
									v: "Github",
									t: "sidebarDark",
									href: "https://github.com",
									i: "i-logos:github-icon",
									ic: "bg-gray-2 rounded-lg",
								},
							},
						],
					},
				},
			],
		},
		{
			title: "Links",
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						t: "sidebarDark",
						href: "https://google.com",
						i: "i-logos:google-icon",
						subtitle: "Google Site",
					},
				},
			],
		},
	],
};
</script>
<!-- #endregion showcase -->
