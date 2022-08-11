import fs from "fs-extra";
import type { ITransform } from "./types";
import { transformVue } from "./vue";

export function transform(): ITransform {
	async function vueToSvelte(from: string, toDir: string, toFile: string): Promise<void> {
		const vueCode = await fs.readFile(from, "utf-8");
		const svelteCode = await transformVue(vueCode, from);
		if (!fs.existsSync(toDir)) fs.mkdirSync(toDir, { recursive: true });
		await fs.writeFile(toDir + "/" + toFile, svelteCode);
	}

	return { vueToSvelte };
}
