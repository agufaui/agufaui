<!-- #region showcase -->
<template>
	<div class="flex items-start flex-wrap gap-4 lg:h-24rem h-30rem doc">
		<amdropdown
			v="Sites"
			i="i-majesticons:sitemap"
			:items="items"
			:badges="[
				{ v: 'Beta', t: 'round', c: 'bg-blue' },
				{ v: 'New', t: 'round', c: 'bg-lime' },
			]"
			c="w-12em"
			titlesc="hover:text-gray-5 dark:text-white dark:hover:text-gray-3"
		/>
		<amdropdown
			v="Sites"
			i="i-majesticons:sitemap"
			t="elevation"
			:items="elevationItems"
			c="w-12em"
			titlesc="hover:text-gray-5 dark:text-white dark:hover:text-gray-3"
			linksc="dark:bg-white"
		/>
		<amdropdown
			v="Expanded Sites"
			i="i-majesticons:sitemap"
			:expand="true"
			:items="expandItems"
			c="w-12em"
			titlesc="dark:text-white"
		/>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocMenuDropdown",
};
</script>

<script setup lang="ts">
import type { TAMItem } from "@agufaui/theme";

const items: TAMItem[] = [
	{
		name: "link",
		props: {
			v: "Google",
			vc: "dark:text-white",
			href: "https://google.com",
			badges: [{ v: "Alpha", t: "round", c: "bg-red" }],
		},
	},
	{
		name: "link",
		props: {
			v: "Github",
			vc: "dark:text-white",
			href: "https://github.com",
		},
	},
	{
		name: "dropdown",
		props: {
			v: "Other Sites",
			i: "i-majesticons:sitemap",
			titlesc: "dark:text-white dark:hover:text-gray-3",
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						vc: "dark:text-white",
						href: "https://google.com",
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						vc: "dark:text-white",
						href: "https://github.com",
					},
				},
			],
		},
	},
	{
		name: "dropdown",
		props: {
			v: "Expanded Sites",
			i: "i-majesticons:sitemap",
			titlesc: "dark:text-white",
			expand: true,
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						vc: "dark:text-white",
						href: "https://google.com",
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						vc: "dark:text-white",
						href: "https://github.com",
					},
				},
			],
		},
	},
];

const elevationItems: TAMItem[] = [
	{
		name: "link",
		props: {
			v: "Google",
			vc: "dark:text-gray-900",
			href: "https://google.com",
			i: "i-logos:google-icon",
		},
	},
	{
		name: "link",
		props: {
			v: "Github",
			vc: "dark:text-gray-900",
			href: "https://github.com",
			i: "i-logos:github-icon",
		},
	},
	{
		name: "dropdown",
		props: {
			v: "Other Sites",
			i: "i-majesticons:sitemap",
			titlesc: "dark:text-gray-800 dark:hover:text-gray-500",
			t: "elevation",
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						vc: "dark:text-gray-900",
						href: "https://google.com",
						i: "i-logos:google-icon",
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						vc: "dark:text-gray-900",
						href: "https://github.com",
						i: "i-logos:github-icon",
					},
				},
			],
		},
	},
	{
		name: "dropdown",
		props: {
			v: "Expanded Sites",
			i: "i-majesticons:sitemap",
			titlesc: "dark:text-gray-800",
			t: "elevation",
			expand: true,
			items: [
				{
					name: "link",
					props: {
						v: "Google",
						vc: "dark:text-gray-900",
						href: "https://google.com",
						i: "i-logos:google-icon",
					},
				},
				{
					name: "link",
					props: {
						v: "Github",
						vc: "dark:text-gray-900",
						href: "https://github.com",
						i: "i-logos:github-icon",
					},
				},
			],
		},
	},
];

const expandItems: TAMItem[] = [
	{
		name: "link",
		props: {
			v: "Google",
			vc: "dark:text-white",
			href: "https://google.com",
		},
	},
	{
		name: "link",
		props: {
			v: "Github",
			vc: "dark:text-white",
			href: "https://github.com",
		},
	},
];
</script>
<!-- #endregion showcase -->
