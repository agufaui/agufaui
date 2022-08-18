import { join, relative, resolve } from "path";
import fs from "fs-extra";
import matter from "gray-matter";
import type { PackageIndexes, AgufaUIElement, AgufaUIPackage } from "../types";
import fg from "fast-glob";
import Git from "simple-git";
import { packages } from "../packages";
import { getCategories } from "../utils";

export const DOCS_URL = "https://ui.agufa.tech";
export const DIR_PACKAGE = resolve(__dirname, "..");
export const DIR_ROOT = resolve(__dirname, "../../..");
export const DIR_SRC = resolve(DIR_ROOT, "packages");
export const DIR_TYPES = resolve(DIR_ROOT, "types/packages");

export const git = Git(DIR_ROOT);

export async function listComponents(dir: string, ignore: string[] = []) {
	const files = await fg("*", {
		onlyDirectories: true,
		cwd: dir,
		ignore: ["_*", ".*", "dist", "node_modules", "types", ...ignore],
	});
	files.sort();
	return files;
}

export async function readMetadata() {
	const indexes: PackageIndexes = {
		packages: {},
		categories: [],
		fncategories: [],
		components: [],
		functions: [],
	};

	for (const info of packages) {
		if (info.utils) continue;

		const dirPath = join(DIR_SRC, info.path ? info.path : info.name);

		const components = await listComponents(dirPath);

		const pkg: AgufaUIPackage = {
			...info,
			dir: relative(DIR_ROOT, dirPath).replace(/\\/g, "/"),
			docs: info.addon ? `${DOCS_URL}/${info.name}/README.html` : undefined,
		};

		indexes.packages[info.name] = pkg;

		await Promise.all(
			components.map(async (elName) => {
				const mdPath = join(dirPath, elName, "index.md");
				const fileName = pkg.name === "core" ? "index.vue" : "index.ts";
				const filePath = join(dirPath, elName, fileName);

				const el: AgufaUIElement = {
					name: elName,
					package: pkg.name,
					// lastUpdated:
					//   +(await git.raw(["log", "-1", "--format=%at", filePath])) * 1000,
				};

				if (fs.existsSync(join(dirPath, elName, "component.ts"))) el.component = true;
				if (fs.existsSync(join(dirPath, elName, "directive.ts"))) el.directive = true;

				if (!fs.existsSync(mdPath)) {
					el.internal = true;
					indexes.functions.push(el);
					return;
				}

				el.docs = `${DOCS_URL}/${pkg.name}/${elName}/`;

				const mdRaw = await fs.readFile(mdPath, "utf-8");

				const { content: md, data: frontmatter } = matter(mdRaw);
				const category = frontmatter.category;

				let alias = frontmatter.alias;
				if (typeof alias === "string")
					alias = alias
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean);
				let related = frontmatter.related;
				if (typeof related === "string")
					related = related
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean);

				let description =
					(md.replace(/\r\n/g, "\n").match(/# \w+.*[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] ||
					"";

				description = description.trim();
				description = description.charAt(0).toLowerCase() + description.slice(1);

				el.category = ["core", "use"].includes(pkg.name) ? category : `@${pkg.display}`;
				el.description = description;

				if (description.includes("DEPRECATED")) el.deprecated = true;

				if (alias?.length) el.alias = alias;

				if (related?.length) el.related = related;

				if (pkg.name === "core") {
					indexes.components.push(el);
				} else {
					indexes.functions.push(el);
				}
			})
		);
	}

	indexes.components.sort((a, b) => a.name.localeCompare(b.name));
	indexes.functions.sort((a, b) => a.name.localeCompare(b.name));
	indexes.categories = getCategories(indexes.components);
	indexes.fncategories = getCategories(indexes.functions);

	const relatedFn = (el: AgufaUIElement) => {
		if (!el.related) return;

		el.related.forEach((name) => {
			let target = indexes.components.find((c) => c.name === name);
			if (!target) target = indexes.functions.find((f) => f.name === name);
			if (!target) throw new Error(`Unknown related function: ${name}`);
			if (!target.related) target.related = [];
			if (!target.related.includes(el.name)) target.related.push(el.name);
		});
	};

	// interop related
	indexes.components.forEach((cp) => {
		relatedFn(cp);
	});
	indexes.components.forEach((cp) => cp.related?.sort());
	indexes.functions.forEach((fn) => {
		relatedFn(fn);
	});
	indexes.functions.forEach((fn) => fn.related?.sort());

	return indexes;
}

async function run() {
	const indexes = await readMetadata();
	await fs.writeJSON(join(DIR_PACKAGE, "index.json"), indexes, { spaces: 2 });
}

run();
