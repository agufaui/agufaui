import { currentVersion } from "../../meta/versions";
import {
	addonCategoryNames,
	addonFnCategoryNames,
	categoryNames,
	fncategoryNames,
	coreCategoryNames,
	coreFnCategoryNames,
	metadata,
} from "../../packages/metadata/metadata";
import { useString } from "../use";

const { pascalCaseToSpace } = useString();

const componentsSideBar = getComponentsSideBar();
const functionsSideBar = getFunctionsSideBar();

const Guide = [
	{ text: "Get Started", link: "/guide/" },
	{ text: "Configuration", link: "/guide/config" },
	{ text: "Icons", link: "/guide/icon" },
	{ text: "I18n", link: "/guide/i18n" },
];

const coreCategories = getComponentsCategories();

// const coreCategories = coreCategoryNames.map((c) => ({
// 	text: c,
// 	activeMatch: "___", // never active
// 	link: `/core/#category=${c}`,
// }));

const coreFnCategories = coreFnCategoryNames.map((c) => ({
	text: c,
	activeMatch: "___", // never active
	link: `/use/#category=${c}`,
}));

const AddonCategories = [
	...addonCategoryNames.map((c) => ({
		text: c.slice(1),
		activeMatch: "___", // never active
		link: `/core/#category=${encodeURIComponent(c)}`,
	})),
];

const AddonFnCategories = [
	...addonFnCategoryNames.map((c) => ({
		text: c.slice(1),
		activeMatch: "___", // never active
		link: `/use/#category=${encodeURIComponent(c)}`,
	})),
];

const Links = [{ text: "Contributing", link: "/contributing" }];

const DefaultSideBar = [
	{ text: "Guide", items: Guide },
	{ text: "Community", items: Links },
];

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
	// extends: themeConfig,

	title: "AgufaUI",
	description: "Vue, Svelte UI Library",
	appearance: true,
	base: "/",
	lang: "en-US",
	srcExclude: ["**/node_modules/**", "**/dist/**", "**/README.md", "../use/functions/**/*.md"],
	themeConfig: {
		siteTitle: "gufaUI",
		logo: "/favicon.svg",
		repo: "agufaui/agufaui",
		docsDir: "packages",

		editLink: {
			pattern: "https://github.com/agufaui/agufaui/blob/main/packages/:path",
			text: "Suggest changes to this page",
		},
		lastUpdated: "Last Updated",

		algolia: {
			apiKey: "a99ef8de1b2b27949975ce96642149c6",
			indexName: "agufaui",
		},

		socialLinks: [{ icon: "github", link: "https://github.com/agufaui/agufaui" }],

		nav: [
			{
				text: "Guide",
				items: [
					{ text: "Guide", items: Guide },
					{ text: "Community", items: Links },
				],
			},
			{
				text: "Components",
				items: [
					// {
					// 	text: "",
					// 	items: [
					// 		{ text: "All Components", link: "/core/#" },
					// 		{ text: "Recent Updated", link: "/core/#sort=updated" },
					// 	],
					// },
					{ text: "Categories", items: coreCategories },
				],
			},
			// {
			//   text: "Functions",
			//   items: [
			//     {
			//       text: "",
			//       items: [
			//         { text: "All Functions", link: "/use/#" },
			//         { text: "Recent Updated", link: "/use/#sort=updated" },
			//       ],
			//     },
			//     { text: "Categories", items: coreFnCategories },
			//   ],
			// },
			// {
			//   text: "Playground",
			//   link: "https://play.ui.agufa.tech",
			// },
			{
				text: currentVersion,
				items: [
					{
						items: [
							{
								text: "Release Notes",
								link: "https://github.com/agufaui/agufaui/releases",
							},
						],
					},
				],
			},
		],
		sidebar: {
			"/guide/": DefaultSideBar,
			"/contributing": DefaultSideBar,
			"/guidelines": DefaultSideBar,
			"/export-size": DefaultSideBar,
			"/recent-updated": DefaultSideBar,

			"/core/": componentsSideBar,
			// "/use/": functionsSideBar,
		},
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2022-PRESENT Agufa.tech",
		},
	},
	head: [
		["meta", { name: "theme-color", content: "#ffffff" }],
		["link", { rel: "icon", href: "/favicon-32x32.png", type: "image/png" }],
		["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
		["meta", { name: "author", content: "Agufa.tech" }],
		[
			"meta",
			{
				name: "keywords",
				content:
					"UI Library, Components Library, Vue, Nuxt, Svelte, SvelteKit, Highly Customizable, Utility CSS, Atomic CSS, Unstyled Components, Beautifully Handcrafted, Pure CSS Icons",
			},
		],
		["meta", { property: "og:title", content: "AgufaUI" }],
		["meta", { property: "og:image", content: "https://ui.agufa.tech/favicon.svg" }],
		[
			"meta",
			{
				property: "og:description",
				content: "Vue, Svelte UI Library",
			},
		],
		["meta", { name: "twitter:card", content: "summary_large_image" }],
		["meta", { name: "twitter:creator", content: "@agufatech" }],
		["meta", { name: "twitter:image", content: "https://ui.agufa.tech/favicon.svg" }],
	],
};

function getComponentsCategories() {
	const links = [];

	for (const name of categoryNames) {
		if (name.startsWith("_")) continue;

		const components = metadata.components.filter((i) => i.category === name && !i.internal);

		links.push({
			text: name,
			activeMatch: "___", // never active
			link: components[0].external || `/${components[0].package}/${components[0].name}/`,
		});
	}

	return links;
}

function getComponentsSideBar() {
	const links = [];

	for (const name of categoryNames) {
		if (name.startsWith("_")) continue;

		const components = metadata.components.filter((i) => i.category === name && !i.internal);

		links.push({
			text: name,
			items: components.map((i) => ({
				text: pascalCaseToSpace(i.name),
				link: i.external || `/${i.package}/${i.name}/`,
			})),
			link: name.startsWith("@")
				? components[0].external || `/${components[0].package}/README`
				: undefined,
		});
	}

	return links;
}

function getFunctionsSideBar() {
	const links = [];

	for (const name of fncategoryNames) {
		if (name.startsWith("_")) continue;

		const functions = metadata.functions.filter((i) => i.category === name && !i.internal);

		links.push({
			text: name,
			items: functions.map((i) => ({
				text: i.name,
				link:
					i.external || i.package === "use"
						? `/${i.package}/functions/${i.name}/`
						: `/${i.package}/${i.name}/`,
			})),
			link: name.startsWith("@")
				? functions[0].external || `/${functions[0].package}/README`
				: undefined,
		});
	}

	return links;
}

export default config;
