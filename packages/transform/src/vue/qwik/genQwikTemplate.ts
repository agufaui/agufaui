import type { IContext, IBlock, ITag, IText, IAttr, ITemplateNodeTransform } from "../types";
import type { TRecursiveComponentInfo } from "../../types";
import { useClone } from "@agufaui/use";

export const noClosingTags = new Set([
	"input",
	"img",
	"br",
	"hr",
	"link",
	"meta",
	"area",
	"base",
	"col",
	"embed",
	"keygen",
	"param",
	"source",
	"track",
	"wbr",
]);

/**
 *  transform vue template (pug) to qwik template
 *  @example
 *  // returns <div bind:v="v"></div>
 *  <template lang="pug">div(v-model:v="v")</template>
 *  @param {IContext} context - context of this script
 *  @returns {string}
 */
export function getQwikTemplate(context: IContext = {}): string {
	let template = "\t<>";
	let genTemplate = genQwikTemplate(context.templateAst!, context);
	// \b is word boundary.  (?!=) is negative lookahead assertion, means match word only if it's not followed by =
	context.computedProps?.forEach(
		(p) =>
			(genTemplate = genTemplate.replace(new RegExp("\\b" + p + "\\b(?!=)", "g"), "state." + p))
	);
	context.notComputedProps?.forEach(
		(p) =>
			(genTemplate = genTemplate.replace(new RegExp("\\b" + p + "\\b(?!=)", "g"), "props." + p))
	);
	context.refs?.forEach(
		(p) => (genTemplate = genTemplate.replace(new RegExp("\\b" + p + "\\b", "g"), p + ".value"))
	);
	// if (context.componentName === "CADropdownButtonName") {
	//   console.log(genTemplate)
	// }
	template += "\t" + genTemplate;
	template += "\n\t</>";
	// remove beginning new line character "\n"
	return template;
}

/**
 *  transform vue template ast (pug) to qwik template
 *  @example
 *  // returns <div bind:v="v"></div>
 *  <template lang="pug">div(v-model:v="v")</template>
 *  @param {IBlock} templateAst - vue template ast (pug)
 *  @param {IContext} context - context of this script
 *  @param {string} indent - indentation for each line
 *  @returns {string}
 */
export function genQwikTemplate(
	templateAst: IBlock,
	context: IContext = {},
	indent: string = ""
): string {
	return templateAst.nodes.reduce((code, node) => {
		switch (node.type) {
			case "Text":
				const textNode = node as IText;
				const val = textNode.val.replace(/{{/g, "{").replace(/}}/g, "}");
				code += " " + val;
				break;
			case "Tag":
				const tagNode = node as ITag;

				// console.log(tagNode.attrs);
				code = transformTagNode(tagNode, context, indent, code);
				break;
			case "Comment":
				break;
			default:
				throw new Error("Unknown node type: " + node.type);
		}

		return code;
	}, "");
}

/**
 *  transform vue template ast top level elements, recursive function
 *  @example
 *  // returns <div bind:v="v"></div>
 *  div(v-model:v="v")
 *  @param {ITag} tagNode - element node
 *  @param {IContext} context - context of this script
 *  @param {string} indent - indentation for each line
 *  @param {string} code - already transformed qwik template code
 *  @returns {string}
 */
export function transformTagNode(
	tagNode: ITag,
	context: IContext = {},
	indent: string = "",
	code: string
): string {
	if (tagNode.name === "component") {
		if (context.recursiveComponentsInfo) {
			for (const recursiveComponentInfo of context.recursiveComponentsInfo) {
				if (context.path?.includes(recursiveComponentInfo.fileName)) {
					return transformRecursiveDynamicComponentNode(
						tagNode,
						context,
						indent,
						code,
						recursiveComponentInfo
					);
				}
			}
		}
	}

	return transformNormalNode(tagNode, context, indent, code);
}

/**
 *  transform recursive dynamic component element
 *  @example
 *  // returns
 *  //  {#each items as item, i (i)}
 *  //    {#if item.name === 'dropdown'}
 *	//      <qwik:self {...item.props} {...item.attrs}></qwik:self>
 *	//		{:else}
 *  //      {#await getComponent(item.name) then c}
 *	//			  <qwik:component this="{c}" {...item.props} {...item.attrs}></qwik:component>
 *  //      {/await}
 *  //    {/if}
 *  //  {/each}
 *  component(v-for="item, i in items" :key="i" :is="getComponent(item.name)" v-bind="{...item.props, ...item.attrs}")
 *  @param {ITag} tagNode - element node
 *  @param {IContext} context - context of this script
 *  @param {string} indent - indentation for each line
 *  @param {string} code - already transformed qwik template code
 *  @param {TRecursiveComponentInfo} recursiveComponentInfo - recursive component info
 *  @returns {string}
 */
export function transformRecursiveDynamicComponentNode(
	tagNode: ITag,
	context: IContext = {},
	indent: string = "",
	code: string,
	recursiveComponentInfo: TRecursiveComponentInfo
): string {
	const { deepClone } = useClone();

	// create an intermediate node to only process attributes v-for, :key and v-if that have pre block code
	const intermediateNode = deepClone(tagNode);
	intermediateNode.attrs = intermediateNode.attrs.filter((attr) =>
		["v-for", ":key", "v-if"].includes(attr.name)
	);
	// process attributes v-for, :key and v-if that have pre block code
	const intermediateNodeTransform = reduceAttrs(intermediateNode, context, code);
	// queue, eg. [{#each items as item}, {#if show}]
	const pre = intermediateNodeTransform.pre;
	// stack, eg. [{/each}, {/if}]
	const preClose = intermediateNodeTransform.preClose;
	// already transformed qwik template code
	let newCode = intermediateNodeTransform.code;

	let newIndent = indent;

	// apply pre
	while (pre.length > 0) {
		// queue, first in first out
		const controlStatement = pre.shift();

		// control statement if...else or for loop
		newCode += "\n" + newIndent + controlStatement;

		newIndent += "\t";
	}

	// transform vue recursive component to qwik:self
	const selfNode = deepClone(tagNode);
	selfNode.name = "qwik:self";
	const attrIs = selfNode.attrs.filter((attr) => attr.name === ":is")[0];
	selfNode.attrs = selfNode.attrs.filter(
		(attr) => !["v-for", ":key", ":is", "v-if"].includes(attr.name)
	);
	// match pattern, eg. getComponent(item.name) => item.name
	const match = attrIs.val.match(/\((.+)\)/);
	if (match?.[1]) {
		selfNode.attrs.push({
			name: "v-if",
			val: `${match[1]} === '${recursiveComponentInfo.matchName}'`,
			mustEscape: true,
		});
	}

	newCode = transformTagNode(selfNode, context, newIndent, newCode);

	// transform vue component to qwik:component
	tagNode.name = "qwik:component";
	tagNode.attrs = tagNode.attrs.filter((attr) => !["v-for", ":key", "v-if"].includes(attr.name));
	tagNode.attrs.unshift({
		name: "v-else",
		val: "true",
		mustEscape: true,
	});

	newCode = transformTagNode(tagNode, context, newIndent, newCode);

	// close pre
	while (preClose.length > 0) {
		// remove ending indentation
		newIndent = newIndent.replace(/\t$/, "");

		// stack, first in last out
		const closeControlStatement = preClose.pop();

		newCode += "\n" + newIndent + closeControlStatement;
	}

	return newCode;
}

/**
 *  transform normal elements
 *  @example
 *  // returns <div v={v}></div>
 *  div(v-model:v="v")
 *  @param {ITag} tagNode - element node
 *  @param {IContext} context - context of this script
 *  @param {string} indent - indentation for each line
 *  @param {string} code - already transformed qwik template code
 *  @returns {string}
 */
export function transformNormalNode(
	tagNode: ITag,
	context: IContext = {},
	indent: string = "",
	code: string
): string {
	const nodeTransform = reduceAttrs(tagNode, context, code);
	// eg. class={'flex' + ' ' + cclosec}
	let attrs = nodeTransform.attrs;
	// queue, eg. [{items.map((item, i) => { , {show ? ]
	const pre = nodeTransform.pre;
	// stack, eg. [})}, :''}]
	const preClose = nodeTransform.preClose;
	// already transformed qwik template code
	let newCode = nodeTransform.code;

	// wrap html element or component attributes
	attrs = attrs.trim();
	attrs = attrs ? " " + attrs + (noClosingTags.has(tagNode.name) ? " />" : ">") : ">";

	// Agufaui components name first letter to uppercase
	if (tagNode.name.startsWith("a") && tagNode.name.length > 1) {
		tagNode.name = tagNode.name.charAt(0).toUpperCase() + tagNode.name.substring(1);
	}

	if (tagNode.name === "template") {
		tagNode.name = "q:template";
	}

	let newIndent = indent;

	while (pre.length > 0) {
		// queue, first in first out
		const controlStatement = pre.shift();

		// control statement if...else or for loop
		newCode += "\n" + newIndent + controlStatement;

		newIndent += "\t";
	}

	if (context.childComponents?.includes(tagNode.name)) {
		newCode += "\n" + newIndent + "<" + tagNode.name + ">";
	} else {
		newCode += "\n" + newIndent + "<" + tagNode.name + attrs;
	}

	// recursive call child nodes
	newCode += genQwikTemplate(tagNode.block, context, newIndent + "\t");

	// if not self-closing tag
	if (!noClosingTags.has(tagNode.name)) {
		newCode += "\n" + newIndent + "</" + tagNode.name + ">";
	}

	while (preClose.length > 0) {
		// remove ending indentation
		newIndent = newIndent.replace(/\t$/, "");

		// stack, first in last out
		const closeControlStatement = preClose.pop();

		newCode += "\n" + newIndent + closeControlStatement;
	}

	return newCode;
}

/**
 *  transform element attributes
 *  @example
 *  // returns v={v}
 *  v-model:v="v"
 *  @param {ITag} tagNode - element node
 *  @param {IContext} context - context of this script
 *  @param {string} code - already transformed code
 *  @returns {string}
 */
export function reduceAttrs(
	tagNode: ITag,
	context: IContext = {},
	code: string
): ITemplateNodeTransform {
	const attrs: IAttr[] = tagNode.attrs;
	const pre: string[] = [];
	const preClose: string[] = [];

	const attrsString: string = attrs.reduce((final, attr) => {
		let name: string;
		let val: string;

		val = attr.val.toString();
		// transform {{ val }} to { val }
		val = val.replace(/{{/g, "{").replace(/}}/g, "}");
		// transform vue multiline string `xx` to "xx"
		val = val.replace(/^`|`$/g, '"');

		if (attr.name === "role") {
			return final;
		} else if (attr.name === "v-on-click-outside") {
			name = "on-click_outside";
			val = val.replace(/^"|"$/g, "");
			final += ` ${name}={${val}}`;
		} else if (attr.name.startsWith(":") || attr.name.startsWith("v-bind:")) {
			// eg. :class to class
			name = attr.name.substring(1);

			// eg. "cclosec" to cclosec
			val = val.replace(/^"|"$/g, "");

			if (name === "is") {
				// handle vue dynamic component <component />
				name = "this";
				if (val.includes("getComponent(")) {
					pre.push(`{#await ${val} then c}`);
					preClose.push(`{/await}`);
					val = "c";
				}
			}

			if (val.startsWith("[") && val.endsWith("]")) {
				// transform [ccloseicon, cclosec] to {ccloseicon + ' ' + cclosec}
				val = val.replace(/^\[|\]$/g, "");
				const valEls = val.split(",");

				let vals = valEls.reduce((sum, valEl) => {
					const valElTrim = valEl.trim();
					if (valElTrim.startsWith("{") && valElTrim.endsWith("}")) {
						// if valEl already has bracket
						if (sum === "{") {
							sum += transformCurlyBracketsClass(valElTrim);
						} else {
							sum += " + ' ' + " + transformCurlyBracketsClass(valElTrim);
						}
					} else {
						// if valEl doesn't have bracket: cclosec
						if (sum === "{") {
							sum += valElTrim;
						} else {
							sum += " + ' ' + " + valElTrim;
						}
					}
					return sum;
				}, "{");

				vals = vals.trim();
				val = vals + "}";
			} else if (val.startsWith("{") && val.endsWith("}")) {
				val = transformCurlyBracketsClass(val);
			} else {
				// eg. cclosec to {cclosec}
				val = `{${val}}`;
			}

			// match pattern, eg. (class="flex items-center justify-between")
			// use [\s\S] instead of . for multiline matching
			const match = final.match(new RegExp(`${name}\\s*=\\s*"[\\s\\S]*?"`, "m"));

			if (match) {
				// handle vue template case (class="..." :class="...")

				// append transformed code to matched regular pattern, eg.
				// class="flex items-center justify-between" :class="[cdisplay, cc]"
				// to
				// class={"flex items-center justify-between" + ' ' + cdisplay + ' ' + cc}

				// eg. val = {cdisplay + ' ' + cc}
				val = val.replace(/^\{/, "");
				// match[0]: class="flex items-center justify-between"
				const m = match[0].replace("=", "={") + " + ' ' + " + `${val}`;
				final = final.replace(match[0], m);
			} else {
				final += ` ${name}=${val}`;
			}
		} else if (attr.name.startsWith("@") || attr.name.startsWith("v-on:")) {
			// eg. @click to click
			const subName = attr.name.substring(1);
			name = "on" + subName.charAt(0).toUpperCase() + subName.substring(1) + "$";

			// eg. click.stop.prevent to onClick
			name = name
				.replace(".stop", "")
				.replace(".prevent", "")
				.replace(".once", "")
				.replace(".capture", "")
				.replace(".self", "")
				.replace(".passive", "");

			// eg. "show=!show" to show=!show
			val = val.replace(/^"|"$/g, "");

			// match pattern, eg. $event in click($event)
			// eg. = in show=!show
			const match = val.match(/\((.*)\)|=/);
			if (match) {
				if (match[1] && match[1].includes("$event")) {
					// transform click($event) to (e) => click(e)
					val = "(e) => " + val;
					val = val.replace("$event", "e");
				} else {
					if (val.includes("if")) {
						// transform if (!expand) open = !open; to () => {if (!expand) open = !open;}
						val = "() => {" + val + "}";
					} else {
						// tranform show=!show to () => show=!show
						val = "() => " + val;
					}
				}
			}

			final += ` ${name}={${val}}`;

			context.hasEmits = true;
			// eg. click.stop.prevent to ['click', 'stop', 'prevent']
			const nameModifiers = subName.split(".");
			// add event name (eg. 'click') to context.emits
			if (context.emits) {
				context.emits.push(nameModifiers[0]);
			} else {
				context.emits = [nameModifiers[0]];
			}
		} else if (attr.name.startsWith("#")) {
			// eg. transform #default to q:slot="default"
			const slotName = attr.name.substring(1);
			final += ` q:slot="${slotName}"`;
		} else if (attr.name.startsWith("v-once")) {
			// final += ` once`;
		} else if (attr.name.startsWith("v-bind")) {
			const valClean = val.replace(/[{}\s"()]|\.{3}/g, "");
			const valArray = valClean.split(",");
			for (const valSingle of valArray) {
				if (["$attrs", "$attrsasHTMLAttributes"].includes(valSingle)) {
					// final += " {...$$restProps}";
				} else {
					final += ` {...${valSingle}}`;
				}
			}
		} else if (attr.name.startsWith("v-model:")) {
			// eg. transform v-model:v="v" to v={v}
			val = val.replace(/^"|"$/g, "");
			name = attr.name.replace("v-model:", "");
			final += ` ${name}={${val}}`;
		} else if (attr.name.startsWith("v-model")) {
			// eg. transform v-model="v" to v={v}
			val = val.replace(/^"|"$/g, "");
			final += ` v={${val}}`;
		} else if (attr.name.startsWith("v-show")) {
			// eg. transform v-show="show" to {show && ...}
			val = val.replace(/^"|"$/g, "");
			pre.push(`{${val} &&`);
			preClose.push(`}`);
		} else if (attr.name.startsWith("v-if")) {
			// eg. transform v-if="show" to {show ? ... :''}
			val = val.replace(/^"|"$/g, "");
			pre.push(`{${val} ? `);
			preClose.push(` :""}`);
		} else if (attr.name.startsWith("v-else-if")) {
			// remove ending :''} from code
			code = code.replace(/\n*\t*:""}$/, "");
			val = val.replace(/^"|"$/g, "");
			pre.push(`: ${val} ? `);
			preClose.push(` :""}`);
		} else if (attr.name.startsWith("v-else")) {
			// remove ending :''} from code
			code = code.replace(/\n*\t*:""}$/, "");
			pre.push(`: `);
			preClose.push(` }`);
		} else if (attr.name.startsWith("v-for")) {
			// strip beginning and ending quote of val
			// eg. "item in items" to item in items
			val = val.replace(/^"|"$/g, "");

			// match pattern
			// eg. item in items
			// eg. item, i in items
			// eg. { name, address } in items
			// eg. { name, address }, i in items
			const matches: RegExpMatchArray | null = val.match(
				/^\(?(\w+|{(?:\w+,?\s*)+})(?:,\s*)?(\w+)?\)? in (.*)$/
			);
			if (!matches) {
				throw new Error(`Invalid v-for expression: ${val}`);
			}

			if (matches[2]) {
				// eg. transform "item, i in items" to {items.map((item, i) => { ... })}
				pre.push(`{${matches[3]}.map((${matches[1]}, ${matches[2]}) => ( `);
			} else {
				// eg. transform "item in items" to {items.map((item) => { ... })}
				pre.push(`{${matches[3]}.map((${matches[1]}) => ( `);
			}

			preClose.push(`))}`);
		} else {
			final += ` ${attr.name}=${val}`;
		}

		return final;
	}, "");

	return { attrs: attrsString, pre, preClose, code };
}

/**
 *  transform class attribute curly brackets {} syntax
 *  @example
 *  // returns open? 'text-lg' : ''
 *  {'text-lg': open}
 *  @param {string} val - curly brackets {} syntax to transform
 *  @returns {string}
 */
function transformCurlyBracketsClass(val: string): string {
	// eg. {'text-lg': open, 'text-blue': disabled, 'bg-white'}
	val = val.replace(/^{|}$/g, "");
	const phrases = val.split(",");

	let sum: string = "";

	for (const phrase of phrases) {
		const phraseTrim = phrase.trim();

		if (phraseTrim.includes(":")) {
			const tokens = phraseTrim.split(":");
			if (tokens.length === 2) {
				if (sum) {
					sum += " + ' ' + " + tokens[1].trim() + "? " + tokens[0].trim() + " : ''";
				} else {
					sum += tokens[1].trim() + "? " + tokens[0].trim() + " : ''";
				}
			}
		} else {
			if (sum) {
				sum += " + ' ' + " + phraseTrim;
			} else {
				sum += phraseTrim;
			}
		}
	}

	return sum.trim();
}
