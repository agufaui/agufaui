import type { ITranslateOptions } from "@agufaui/translate";
import type { ParseResult } from "@babel/parser";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { translate, langs } from "@agufaui/translate";
import { useString } from "@agufaui/use";
import { resolve } from "path";
import fs from "fs-extra";

const DIR_PKG = resolve(__dirname, "../packages/locale");
const DIR_SRC = resolve(__dirname, "../packages/locale/lang");
const fromFilePath = resolve(DIR_SRC, "en.ts");
const indexFilePath = resolve(DIR_PKG, "index.ts");
const localeKey = "locale";

const { hyphenToCamelCase } = useString();

function getFileAst(content: string): ParseResult<t.File> {
	return parse(content, {
		sourceType: "module",
		plugins: ["typescript", "topLevelAwait"],
	});
}

async function runAll(): Promise<void> {
	const fromCode: string = await fs.readFile(fromFilePath, "utf-8");
	if (!fs.existsSync(indexFilePath)) {
		fs.createFileSync(indexFilePath);
	}

	fs.writeFileSync(indexFilePath, `export { default as en } from "./lang/en";\n`, {
		encoding: "utf-8",
	});

	await Promise.all(
		Object.keys(langs).map(async (lang: string): Promise<void> => await run(lang, fromCode))
	);

	fs.appendFileSync(indexFilePath, `export * from "./types";\n`, {
		encoding: "utf-8",
	});
}

async function run(lang: string, fromCode: string): Promise<void> {
	const opts: ITranslateOptions = {
		from: "en",
		engine: "google",
	};

	if (lang === opts.from) return;
	if (lang === "auto") return;

	opts.to = lang;

	const scriptFile: ParseResult<t.File> = getFileAst(fromCode);
	const ast: t.Program = scriptFile.program;

	const cache: Record<string, string> = {};

	// traverse ast, get values to be translated
	traverse(scriptFile, {
		ObjectProperty(path) {
			const { key, value } = path.node;
			if (t.isIdentifier(key) && t.isStringLiteral(value)) {
				if (key.name !== localeKey) {
					const objProp = path.parentPath.parentPath?.node as t.ObjectProperty;
					const objKey = objProp.key as t.Identifier;

					cache[objKey.name + key.name] = value.value;
				}
			}
		},
	});

	// get translations
	await Promise.all(
		Object.entries(cache).map(async ([key, value]): Promise<void> => {
			cache[key] = await translate(value, opts);
		})
	);

	// run again because traverse doesn't support async functions
	traverse(scriptFile, {
		ObjectProperty(path) {
			const { key, value } = path.node;
			if (t.isIdentifier(key) && t.isStringLiteral(value)) {
				if (key.name === localeKey && value.value === opts.from) {
					value.value = lang;
					if (!value.extra) {
						value.extra = {};
					}
					value.extra.raw = `"${lang}"`;
					value.extra.rawValue = lang;
				} else {
					const objProp = path.parentPath.parentPath?.node as t.ObjectProperty;
					const objKey = objProp.key as t.Identifier;
					const newValue = cache[objKey.name + key.name];

					if (newValue) {
						value.value = newValue;
						if (!value.extra) {
							value.extra = {};
						}

						value.extra.rawValue = newValue;
						value.extra.raw = `"${newValue}"`;
					}
				}
			}
		},
	});

	const output = generate(ast);

	const toFilePath = resolve(DIR_SRC, `${lang}.ts`);

	await fs.writeFile(toFilePath, output.code, { encoding: "utf-8" });
	await fs.appendFile(
		indexFilePath,
		`export { default as ${hyphenToCamelCase(lang)} } from "./lang/${lang}";\n`,
		{
			encoding: "utf-8",
		}
	);
}

runAll();
