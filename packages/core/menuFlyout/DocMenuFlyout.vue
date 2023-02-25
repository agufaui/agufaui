<!-- #region showcase -->
<template>
	<div class="flex items-start flex-wrap gap-2 h-22rem doc">
		<div class="flex items-center justify-between w-14rem">
			<amflyout v="Sites" :mpanel="mpanel" vc="dark:text-white dark:hover:text-gray-900" />
			<amflyout
				t="arrow"
				v="Sites"
				:mpanel="mpanelTitle"
				vc="dark:text-white"
				:showarrow="true"
				:badges="[
					{ v: 'Beta', t: 'round', c: 'bg-blue' },
					{ v: 'New', t: 'round', c: 'bg-lime' },
				]"
				badgesc="space-x-0.5"
				arrowic="ml-2"
			/>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuFlyout",
};
</script>

<script setup lang="ts">
import type { IAMpanelProps } from "@agufaui/theme";

const mpanel: IAMpanelProps = {
	t: "roundFlyout",
	sections: [
		{
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://google.com",
						i: "i-logos:google-icon",
						subtitle: "Google Site",
						badges: [
							{
								v: "Beta",
								t: "round",
								c: "bg-green-3",
							},
						],
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://github.com",
						i: "i-logos:github-icon",
						subtitle: "Github Site",
					},
				},
			],
		},
		{
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://google.com",
						i: "i-logos:google-icon",
						subtitle: "Google Site",
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://github.com",
						i: "i-logos:github-icon",
						subtitle: "Github Site",
					},
				},
			],
		},
	],
};

const mpanelTitle: IAMpanelProps = {
	t: "roundFlyout",
	sections: [
		{
			title: "Category1",
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://google.com",
						i: "i-logos:google-icon",
						subtitle: "Google Site",
						badges: [
							{
								v: "Beta",
								t: "round",
								c: "bg-green-3",
							},
						],
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://github.com",
						i: "i-logos:github-icon",
						subtitle: "Github Site",
					},
				},
			],
		},
		{
			title: "Category2",
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://google.com",
						i: "i-logos:google-icon",
						subtitle: "Google Site",
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						t: "sidebar",
						vc: "dark:text-gray-900",
						href: "https://github.com",
						i: "i-logos:github-icon",
						subtitle: "Github Site",
					},
				},
			],
		},
	],
};
</script>
<!-- #endregion showcase -->
