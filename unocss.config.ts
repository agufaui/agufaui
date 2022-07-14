import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
  transformerCompileClass,
  extractorSplit,
} from "unocss";
import extractorPug from "@unocss/extractor-pug";

export default defineConfig({
  presets: [
    presetAttributify({
      prefix: "u-",
      prefixedOnly: true,
    }), // required if using attributify mode
    presetUno(), // required
    presetIcons(),
  ],
  extractors: [extractorPug(), extractorSplit],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
});
