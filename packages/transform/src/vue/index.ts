import { parse } from "@vue/compiler-sfc";
import type { Program, File } from "@babel/types";
import type { ParseResult } from "@babel/parser";
import type { ITransformOptions } from "src/types";
import type { IContext, IBlock } from "./types";
import { Framework } from "./types";
import { getFileAst } from "./ast/utils";
import pugLex from "pug-lexer";
import pugParse from "pug-parser";
import { getSvelteTemplate } from "./svelte/genSvelteTemplate";
import { getSvelteScript } from "./svelte/genSvelteScript";
import { getQwikTemplate } from "./qwik/genQwikTemplate";
import { getQwikScript, HtmlTemplatePlaceHolder } from "./qwik/genQwikScript";

export async function transformVue(
	code: string,
	fromPath: string,
	toFramework: Framework,
	options: ITransformOptions
): Promise<string> {
	const {
		descriptor: { template, scriptSetup },
	} = parse(code);

	if (scriptSetup?.lang !== "ts" || !scriptSetup.content || !template?.content) return code;

	const templateAst = pugParse(pugLex(template.content)) as IBlock;
	// console.log(templateAst);
	const scriptFile: ParseResult<File> = getFileAst(scriptSetup.content);
	const scriptAst: Program = scriptFile.program;
	// console.log("script", scriptAst);

	const context: IContext = {
		scriptContent: scriptSetup.content,
		path: fromPath,
		scriptFile,
		scriptAst,
		templateAst,
		...options,
	};

	if (toFramework === Framework.Svelte) {
		const svelteTemplate = getSvelteTemplate(context);

		const svelteScript = await getSvelteScript(context);

		return svelteTemplate + "\n" + svelteScript;
	}

	if (toFramework === Framework.Qwik) {
		const qwikScript = await getQwikScript(context);

		const qwikTemplate = getQwikTemplate(context);

		return qwikScript.replace('"' + HtmlTemplatePlaceHolder + '";', "(\n" + qwikTemplate + "\n);");
	}

	return Promise.reject("No to-framework specified");
}
