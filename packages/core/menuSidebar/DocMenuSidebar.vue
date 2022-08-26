<!-- #region showcase -->
<template>
	<div class="flex doc">
		<amsidebar :items="items" mdropdownt="sidebar" mpanelt="flyout">
			<template #header>
				<aa
					href="https://google.com"
					i="i-logos:google"
					ic="text-5xl"
					c="flex-shrink-0 bg-gray-900 rounded-none"
				/>
			</template>
			<template #footer>
				<div class="bg-gray-900">
					<abutton
						v="signout"
						i="i-ic:sharp-logout"
						ic="text-lg"
						spacex="space-x-4"
						c="flex-shrink-0 text-white rounded-none"
					/>
				</div>
			</template>
		</amsidebar>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuSidebar",
};
</script>

<script setup lang="ts">
import type { IAMsidebarItem } from "@agufaui/theme";
const items: IAMsidebarItem[] = [
	{
		v: "Sites",
		i: "i-majesticons:sitemap",
		links: [
			{
				v: "Google",
				vc: "dark:text-gray-900",
				href: "https://google.com",
				i: "i-logos:google-icon",
				subtitle: "Google Site",
			},
			{
				v: "Github",
				vc: "dark:text-gray-900",
				href: "https://github.com",
				i: "i-logos:github-icon",
				subtitle: "Github Site",
			},
		],
	},
	{
		v: "Another Sites",
		i: "i-dashicons:admin-site",
		links: [
			{
				v: "Google",
				vc: "dark:text-gray-900",
				href: "https://google.com",
				i: "i-logos:google-icon",
				subtitle: "Google Site",
			},
			{
				v: "Github",
				vc: "dark:text-gray-900",
				href: "https://github.com",
				i: "i-logos:github-icon",
				subtitle: "Github Site",
			},
		],
	},
	{
		v: "Google",
		i: "i-logos:google-icon",
		href: "https://google.com",
	},
];
</script>
<!-- #endregion showcase -->
