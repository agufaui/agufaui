<script lang="ts">
	import type { TAMSection, IAMpanelProps } from "@agufaui/theme";
	import { Amtoggle, Ampanel, Amflyout } from "@agufaui/svelte";

	let open = false;

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
</script>

<main>
	<Amtoggle {open} on:click={() => (open = !open)} />
	<Ampanel {sections} c="w-14rem" />
	<div class="flex h-sm">
		<Amflyout v="Sites" {mpanel} vc="dark:text-white dark:hover:text-gray-900" />
	</div>
</main>
