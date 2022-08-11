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
	include: [/\.tsx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/, /\.html?$/, /\.svelte$/],
});
