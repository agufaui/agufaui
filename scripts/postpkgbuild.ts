// @unocss-ignore
import { join, resolve } from "path";
import fs from "fs-extra";
import fg from "fast-glob";
import { transform } from "../packages/transform/index";
import type { TVueComponentFile } from "../packages/transform/index";

export const DOCS_URL = "https://ui.agufa.tech";

export const DIR_ROOT = resolve(__dirname, "..");
export const DIR_SRC = resolve(__dirname, "../packages");

// run post build steps
async function run() {
	await Promise.all([updateSvelte()]);
}

run();

// tansform .vue files to .svelte files
export async function updateSvelte() {
	const vuePath = join(DIR_ROOT, "packages/vue/components/");
	const sveltePath = join(DIR_ROOT, "packages/svelte/src/lib/");
	const qwikSrcPath = join(DIR_ROOT, "packages/qwik/src/");
	const qwikComponentsPath = join(DIR_ROOT, "packages/qwik/src/components/");

	// get vue components dirs
	const dirs: string[] = await fg("*", {
		onlyDirectories: true,
		cwd: vuePath,
	});

	const vueComponentFiles: TVueComponentFile[] = [];

	// get vue components files
	await Promise.all(
		dirs.sort().map(async (dir) => {
			const files = await fg("*", {
				cwd: vuePath + dir,
			});

			files.sort().forEach((file) => {
				if (file.endsWith(".vue")) {
					// eg. { dir: 'alert', file: 'Aalert.vue' }
					vueComponentFiles.push({ dir, file });
				}
			});
		})
	);

	const { vueToSvelte, vueToQwik } = transform();

	const noComputedProp = new Set(["t", "v", "tabindex", "label", "mpanel", "id", "name"]);

	const noComputedFile = new Set(["Amitem.vue"]);

	const noImport = new Set(["vue"]);

	const recursiveComponentsInfo = [{ fileName: "Amdropdown", matchName: "dropdown" }];

	// generate svelte files
	const imports: string[] = await Promise.all(
		vueComponentFiles.map(async (vueComponentFile) => {
			const varName = vueComponentFile.file.replace(".vue", "");
			const svelteFileName = varName + ".svelte";
			const vueFilePath = vuePath + vueComponentFile.dir + "/" + vueComponentFile.file;
			const svelteDirPath = sveltePath + vueComponentFile.dir;
			await vueToSvelte(vueFilePath, svelteDirPath, svelteFileName, {
				noComputedProp,
				noComputedFile,
				noImport,
				recursiveComponentsInfo,
				fromFileName: vueComponentFile.file,
			});
			return `export { default as ${varName} } from "./${vueComponentFile.dir}/${svelteFileName}";`;
		})
	);

	await fs.writeFile(
		join(sveltePath, "index.ts"),
		`${imports.join(
			"\n"
		)}\nexport { configStore } from "./config";\nexport { tr } from "./locale";\nexport * from "./helper";`
	);

	// generate qwik files
	const importsQwik: string[] = await Promise.all(
		vueComponentFiles.map(async (vueComponentFile) => {
			const varName = vueComponentFile.file.replace(".vue", ""); // Abutton.vue to Abutton
			const qwikFileName = varName + ".tsx";
			const vueFilePath = vuePath + vueComponentFile.dir + "/" + vueComponentFile.file;
			const qwikDirPath = qwikComponentsPath + vueComponentFile.dir;
			await vueToQwik(vueFilePath, qwikDirPath, qwikFileName, {
				noComputedProp,
				noComputedFile,
				noImport,
				recursiveComponentsInfo,
				fromFileName: vueComponentFile.file,
			});
			return `export { default as ${varName} } from "./components/${vueComponentFile.dir}/${varName}";`;
		})
	);

	await fs.writeFile(
		join(qwikSrcPath, "index.ts"),
		`${importsQwik.join("\n")}\nexport { tr } from "./locale";\nexport * from "./helper";`
	);
}
