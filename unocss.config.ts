import {
	defineConfig,
	presetUno,
	presetIcons,
	transformerDirectives,
	transformerVariantGroup,
	extractorSplit,
} from "unocss";
import extractorPug from "@unocss/extractor-pug";

export default defineConfig({
	presets: [
		presetUno(), // required
		presetIcons(),
	],
	extractors: [extractorPug(), extractorSplit],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	blocklist: ["container"],
	include: [/\.tsx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/, /\.html?$/, /\.svelte$/],
	exclude: [/node_modules/, /dist/, /types/, /type/, /core.*\.md$/],
});
