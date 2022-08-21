import { join, resolve } from "path";
import fs from "fs-extra";
import Git from "simple-git";
import type { PackageIndexes, AgufaUIElement } from "../packages/metadata";
import { $fetch } from "ohmyfetch";
import { getCategories } from "../packages/metadata/utils";
import { transform } from "../packages/transform/index";
import { useString } from "../packages/use/index";

export const git = Git();

export const DOCS_URL = "https://ui.agufa.tech";

export const DIR_ROOT = resolve(__dirname, "..");
export const DIR_SRC = resolve(__dirname, "../packages");

export function hasDemo(pkgPath: string, name: string) {
	return fs.existsSync(join(DIR_SRC, pkgPath, name, "demo.vue"));
}

export async function updateImport({ packages, functions }: PackageIndexes) {
	for (const { name, dir, manualImport } of Object.values(packages)) {
		if (manualImport) continue;

		let imports: string[];
		if (["use"].includes(name)) {
			imports = functions
				.filter((i) => i.package === name)
				.map((f) => f.name)
				.sort()
				.map((name) => `export * from "./${name}";`);
			await fs.writeFile(join(dir, "index.ts"), `${imports.join("\n")}\n`);
		}
	}
}

export function uniq<T extends any[]>(a: T) {
	return Array.from(new Set(a));
}

export function stringifyFunctions(elements: AgufaUIElement[], title = true) {
	let list = "";

	const categories = getCategories(elements);

	for (const category of categories) {
		if (category.startsWith("_")) continue;

		if (title) list += `### ${category}\n`;

		const categoryElements = elements
			.filter((i) => i.category === category)
			.sort((a, b) => a.name.localeCompare(b.name));

		for (const { name, docs, description, deprecated } of categoryElements) {
			if (deprecated) continue;

			const desc = description ? ` — ${description}` : "";
			list += `  - [\`${name}\`](${docs})${desc}\n`;
		}
		list += "\n";
	}
	return list;
}

export function replacer(
	code: string,
	value: string,
	key: string,
	insert: "head" | "tail" | "none" = "none"
) {
	const START = `<!--${key}_STARTS-->`;
	const END = `<!--${key}_ENDS-->`;
	const regex = new RegExp(`${START}[\\s\\S]*?${END}`, "im");

	const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`;

	if (!code.match(regex)) {
		if (insert === "none") return code;
		else if (insert === "head") return `${target}\n\n${code}`;
		else return `${code}\n\n${target}`;
	}

	return code.replace(regex, target);
}

export async function updatePackageREADME({ packages, functions }: PackageIndexes) {
	for (const { name, dir } of Object.values(packages)) {
		const readmePath = join(dir, "README.md");

		if (!fs.existsSync(readmePath)) continue;

		const functionMD = stringifyFunctions(
			functions.filter((i) => i.package === name),
			false
		);
		let readme = await fs.readFile(readmePath, "utf-8");
		readme = replacer(readme, functionMD, "FUNCTIONS_LIST");

		await fs.writeFile(readmePath, `${readme.trim()}\n`, "utf-8");
	}
}

export async function updateIndexREADME({ packages, components }: PackageIndexes) {
	let readme = await fs.readFile("README.md", "utf-8");

	const elCount = components.filter((i) => !i.internal).length;

	readme = readme.replace(
		/img\.shields\.io\/badge\/-(.+?)%20components/,
		`img.shields.io/badge/-${elCount}%20components`
	);

	await fs.writeFile("README.md", `${readme.trim()}\n`, "utf-8");
}

export async function updateCountBadge(indexes: PackageIndexes) {
	const elCount = indexes.components.filter((i) => !i.internal).length;
	const url = `https://img.shields.io/badge/-${elCount}%20components-13708a`;
	const data = await $fetch(url, { responseType: "text" });
	await fs.writeFile(join(DIR_ROOT, "packages/public/badge-function-count.svg"), data, "utf-8");
}

export async function updateSvelte({ packages, components }: PackageIndexes) {
	const vuePath = join(DIR_ROOT, "packages/vue/components/");
	const sveltePath = join(DIR_ROOT, "packages/svelte/src/lib/");
	const { vueToSvelte } = transform();

	const noComputed = new Set(["t", "v", "tabindex", "label"]);

	const noImport = new Set(["vue", "@agufaui/config"]);

	for (const { name } of Object.values(packages)) {
		if (name !== "core") continue;

		const imports: string[] = await Promise.all(
			components
				.filter((i) => i.package === name)
				.map((f) => f.name)
				.sort()
				.map(async (name) => {
					let fname = name;

					if (name === "hyperlink") {
						fname = "a";
					} else if (name === "superscript") {
						fname = "sup";
					} else if (name === "subscript") {
						fname = "sub";
					}

					const varName = "A" + fname;
					const vueName = varName + ".vue";
					const svelteName = varName + ".svelte";
					await vueToSvelte(vuePath + name + "/" + vueName, sveltePath + name, svelteName, {
						noComputed,
						noImport,
					});
					return `export { default as ${varName} } from "./${name}/${svelteName}";`;
				})
		);

		await fs.writeFile(
			join(sveltePath, "index.ts"),
			`${imports.join("\n")}\nexport { configStore } from "./config";\n`
		);
	}
}
