<!-- #region showcase -->
<template>
	<div class="flex items-start flex-wrap gap-4 doc">
		<ampanel :sections="sections" c="w-14rem" />
		<ampanel :sections="titlesSections" c="w-14rem" />
		<ampanel :sections="titlesSections" t="noDivide" c="w-14rem" />
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuPanel",
};
</script>

<script setup lang="ts">
import type { TAMSection } from "@agufaui/theme";

const sections: TAMSection[] = [
	{
		items: [
			{
				name: "dropdown",
				props: {
					t: "sidebar",
					v: "Sites",
					i: "i-majesticons:sitemap",
					titlesc: "dark:hover:text-gray-9",
					items: [
						{
							name: "link",
							props: {
								v: "Google",
								c: "dark:hover:text-gray-9",
								t: "sidebar",
								href: "https://google.com",
								i: "i-logos:google-icon",
								subtitle: "Google Site",
							},
						},
						{
							name: "link",
							props: {
								v: "Github",
								c: "dark:hover:text-gray-9",
								t: "sidebar",
								href: "https://github.com",
								i: "i-logos:github-icon",
							},
						},
					],
				},
			},
			{
				name: "link",
				props: {
					v: "Google",
					c: "dark:hover:text-gray-9",
					t: "sidebar",
					href: "https://google.com",
					i: "i-logos:google-icon",
					subtitle: "Google Site",
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
					c: "dark:hover:text-gray-9",
					t: "sidebar",
					href: "https://google.com",
					i: "i-logos:google-icon",
					subtitle: "Google Site",
				},
			},
			{
				name: "link",
				props: {
					v: "Github",
					c: "dark:hover:text-gray-9",
					t: "sidebar",
					href: "https://github.com",
					i: "i-logos:github-icon",
				},
			},
		],
	},
];

const titlesSections: TAMSection[] = [
	{
		title: "Category1",
		items: [
			{
				name: "dropdown",
				props: {
					t: "sidebar",
					v: "Sites",
					i: "i-majesticons:sitemap",
					titlesc: "dark:hover:text-gray-9",
					items: [
						{
							name: "link",
							props: {
								v: "Google",
								c: "dark:hover:text-gray-9",
								t: "sidebar",
								href: "https://google.com",
								i: "i-logos:google-icon",
								subtitle: "Google Site",
							},
						},
						{
							name: "link",
							props: {
								v: "Github",
								c: "dark:hover:text-gray-9",
								t: "sidebar",
								href: "https://github.com",
								i: "i-logos:github-icon",
							},
						},
					],
				},
			},
			{
				name: "link",
				props: {
					v: "Google",
					c: "dark:hover:text-gray-9",
					t: "sidebar",
					href: "https://google.com",
					i: "i-logos:google-icon",
					subtitle: "Google Site",
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
					c: "dark:hover:text-gray-9",
					t: "sidebar",
					href: "https://google.com",
					i: "i-logos:google-icon",
					subtitle: "Google Site",
				},
			},
			{
				name: "link",
				props: {
					v: "Github",
					c: "dark:hover:text-gray-9",
					t: "sidebar",
					href: "https://github.com",
					i: "i-logos:github-icon",
				},
			},
		],
	},
];
</script>
<!-- #endregion showcase -->
