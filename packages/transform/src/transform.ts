import type { ITransformOptions } from "./types";
import fs from "fs-extra";
import type { ITransform } from "./types";
import { Framework } from "./vue/types";
import { transformVue } from "./vue";

export function transform(): ITransform {
	async function vueToSvelte(
		fromPath: string,
		toDirPath: string,
		toFileName: string,
		options: ITransformOptions
	): Promise<void> {
		const vueCode = await fs.readFile(fromPath, "utf-8");
		const svelteCode = await transformVue(vueCode, fromPath, Framework.Svelte, options);
		if (!fs.existsSync(toDirPath)) fs.mkdirSync(toDirPath, { recursive: true });
		await fs.writeFile(toDirPath + "/" + toFileName, svelteCode);
	}

	async function vueToQwik(
		fromPath: string,
		toDirPath: string,
		toFileName: string,
		options: ITransformOptions
	): Promise<void> {
		const vueCode = await fs.readFile(fromPath, "utf-8");
		const qwikCode = await transformVue(vueCode, fromPath, Framework.Qwik, options);
		if (!fs.existsSync(toDirPath)) fs.mkdirSync(toDirPath, { recursive: true });
		await fs.writeFile(toDirPath + "/" + toFileName, qwikCode);
	}

	return { vueToSvelte, vueToQwik };
}
