<!-- #region showcase -->
<template>
	<div class="flex w-full doc">
		<ammsidebar :mpanel="mpanel" mpanelc="bg-gray-8 w-14rem" :show="true" @close="close">
			<template #header>
				<aa
					href="https://google.com"
					i="i-logos:google"
					ic="text-5xl"
					c="flex-shrink-0 bg-gray-9 rounded-none"
				/>
			</template>
			<template #footer>
				<div class="bg-gray-9">
					<abutton
						v="signout"
						i="i-ic:sharp-logout"
						ic="text-lg"
						spacex="space-x-4"
						c="flex-shrink-0 text-white rounded-none"
					/>
				</div>
			</template>
		</ammsidebar>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuMobileSidebar",
};
</script>

<script setup lang="ts">
import type { IAMpanelProps } from "@agufaui/theme";

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

const close = () => {
	console.log("close");
};
</script>
<!-- #endregion showcase -->
