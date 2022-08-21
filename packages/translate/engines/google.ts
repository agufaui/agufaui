import type { ITranslateOptions } from "../translate.types";
import type { IEngine } from "./types";
import type { Response } from "node-fetch";

const base = "https://translate.googleapis.com/translate_a/single";

const googleEngine: IEngine = {
	needkey: false,

	fetch: ({ key, from, to, text }: ITranslateOptions): string[] => [
		`${base}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(text!)}`,
	],
	parse: (res: Response): Promise<string> =>
		res.json().then((body: any[]): string => {
			const translated: string =
				body && body[0] && body[0][0] && body[0].map((s: any) => s[0]).join("");
			if (!translated) throw new Error("Translation not found");
			return translated;
		}),
};

export default googleEngine;
