import { parse } from "@vue/compiler-sfc";
import { extractTypesFromSource, getUsedInterfacesFromAst } from "./ast";
import type { Program } from "@babel/types";
import { getAst, replaceAtIndexes } from "./utils";
import pugLex from "pug-lexer";
import pugParse from "pug-parser";
import type { IBlock } from "./svelte/genTemplate";
import { getSvelteTemplate } from "./svelte/genTemplate";
import { getSvelteScript } from "./svelte/genScript";

export async function transformVue(code: string, from: string): Promise<string> {
	const {
		descriptor: { template, scriptSetup },
	} = parse(code);

	if (scriptSetup?.lang !== "ts" || !scriptSetup.content || !template?.content) return code;

	const templateAst = pugParse(pugLex(template.content)) as IBlock;
	// console.log(templateAst);
	const scriptAst = getAst(scriptSetup.content) as Program;
	// console.log("script", scriptAst);
	const svelteTemplate = getSvelteTemplate(templateAst);

	const svelteScript = await getSvelteScript(scriptAst, {
		scriptContent: scriptSetup.content,
		path: from,
		ast: scriptAst,
	});

	// const { result, importNodes, extraSpecifiers, extraReplacements } = await extractTypesFromSource(
	// 	scriptSetup.content,
	// 	interfaces,
	// 	{
	// 		relativePath: from,
	// 		ast: program,
	// 		isInternal: true,
	// 	}
	// );
	// // Skip
	// if (!result.size) {
	// 	return code;
	// }
	// const resolvedTypes = [...result].reverse();
	// const replacements = extraReplacements;
	// // Clean up imports
	// importNodes.forEach((i) => {
	// 	const firstStart = i.specifiers[0].start!;
	// 	const lastEnd = i.specifiers[i.specifiers.length - 1].end!;
	// 	const savedSpecifiers = i.specifiers
	// 		.map((specifier) => {
	// 			if (specifier.type === "ImportSpecifier" && specifier.imported.type === "Identifier") {
	// 				const name = specifier.imported.name;
	// 				const shouldSave = !resolvedTypes.some((x) => x[0] === name);
	// 				if (shouldSave && !extraSpecifiers.includes(name)) {
	// 					return name;
	// 				}
	// 				return null;
	// 			}
	// 			return null;
	// 		})
	// 		.filter((s): s is string => s !== null);
	// 	// Clean the whole import statement if no specifiers are saved.
	// 	if (!savedSpecifiers.length) {
	// 		replacements.push({
	// 			start: i.start!,
	// 			end: i.end!,
	// 			replacement: "",
	// 		});
	// 	} else {
	// 		replacements.push({
	// 			start: firstStart,
	// 			end: lastEnd,
	// 			replacement: savedSpecifiers.join(", "),
	// 		});
	// 	}
	// });
	// const inlinedTypes = resolvedTypes.map((x) => x[1]).join("\n");
	// const transformedCode = [
	// 	// Tag head
	// 	code.slice(0, scriptSetup.loc.start.offset),
	// 	// Script setup content
	// 	inlinedTypes,
	// 	// Replace import statements
	// 	replaceAtIndexes(scriptSetup.content, replacements),
	// 	// Tag end
	// 	code.slice(scriptSetup.loc.end.offset),
	// ].join("\n");
	// return transformedCode;
	return svelteTemplate + "\n" + svelteScript;
}
