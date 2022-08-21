import fetch from "node-fetch";
import * as languages from "./languages";
// Translate text into different languages;
import engines from "./engines";
// Cache the different translations to avoid resending requests
import cache from "./cache";
import type { ITranslateOptions } from "./translate.types";

const defaults = {
	from: "en",
	to: "en",
	engine: "google",
	cache: 30,
};

export async function translate(
	text: string,
	opts: ITranslateOptions | string = {}
): Promise<string> {
	if (typeof opts === "string") opts = { to: opts };
	opts.text = text;
	opts.from = languages.getCode(opts.from || defaults.from);
	opts.to = languages.getCode(opts.to || defaults.to);
	opts.engine = opts.engine || defaults.engine;
	opts.cache = opts.cache || defaults.cache;

	const id = `${opts.from}:${opts.to}:${opts.engine}:${text}`;

	// Use the desired engine
	const engine = engines[opts.engine];

	// If it is cached return ASAP
	const cached = cache.get(id);
	if (cached) return Promise.resolve(cached);

	// Target is the same as origin, just return the string
	if (opts.to === opts.from) {
		return Promise.resolve(text);
	}

	if (engine.needkey && !opts.key) {
		throw new Error(`The engine "${opts.engine}" needs a key, please provide it`);
	}

	const fetchOpts = engine.fetch(opts);

	return fetch(fetchOpts[0])
		.then(engine.parse)
		.then((translated: string) => {
			return cache.put(id, translated, (opts as ITranslateOptions).cache!);
		});
}
