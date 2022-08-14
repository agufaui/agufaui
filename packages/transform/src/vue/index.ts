import { parse } from "@vue/compiler-sfc";
import type { Program, File } from "@babel/types";
import type { ParseResult } from "@babel/parser";
import type { ITransformOptions } from "src/types";
import type { IContext, IBlock } from "./types";
import { getFileAst } from "./ast/utils";
import pugLex from "pug-lexer";
import pugParse from "pug-parser";
import { getSvelteTemplate } from "./svelte/genTemplate";
import { getSvelteScript } from "./svelte/genScript";

export async function transformVue(
	code: string,
	from: string,
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
		path: from,
		scriptFile,
		scriptAst,
		templateAst,
		...options,
	};

	const svelteTemplate = getSvelteTemplate(context);

	const svelteScript = await getSvelteScript(context);

	return svelteTemplate + "\n" + svelteScript;
}
