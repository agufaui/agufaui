import type { IContext, IBlock, ITag, IText } from "../types";

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

export function getSvelteTemplate(context: IContext = {}): string {
	let template = genSvelteTemplate(context.templateAst!, context);
	template += "\n";
	return template.slice(1);
}

export function genSvelteTemplate(
	templateAst: IBlock,
	context: IContext = {},
	indent: string = ""
): string {
	return templateAst.nodes.reduce((code, node) => {
		switch (node.type) {
			case "Text":
				const textNode = node as IText;
				const val = textNode.val.replace(/{{/g, "{").replace(/}}/g, "}").replace(/tr\(/g, "$tr(");
				code += " " + val;
				break;
			case "Tag":
				const tagNode = node as ITag;
				let pre: string = "";
				// console.log(tagNode.attrs);
				let attrs: string = tagNode.attrs.reduce((final, attr) => {
					let name: string;
					let val: string;

					val = attr.val.toString();
					val = val.replace(/{{/g, "{").replace(/}}/g, "}");

					if (attr.name === "role") {
						return final;
					} else if (attr.name.startsWith(":") || attr.name.startsWith("v-bind:")) {
						name = attr.name.substring(1);
						val = val.replace(/^"|"$/g, "");

						if (name === "key") {
							if (pre.includes("{#each")) {
								pre = pre.replace(/}$/, ` (${val})}`);
							}
						} else {
							if (val.startsWith("[") && val.endsWith("]")) {
								val = val.replace(/^\[|\]$/g, "");
								const valEls = val.split(",");

								let vals = valEls.reduce((s, valEl) => {
									const valElTrim = valEl.trim();
									if (valElTrim.startsWith("{") && valElTrim.endsWith("}")) {
										s += " " + valElTrim;
									} else {
										s += " {" + valElTrim + "}";
									}
									return s;
								}, "");

								vals = vals.trim();
								val = vals;
							} else {
								val = `{${val}}`;
							}

							const match = final.match(new RegExp(`${name}\\s*=\\s*".*?"`));
							if (match) {
								const m = match[0].replace(/"$/, ` ${val}"`);
								final = final.replace(match[0], m);
							} else {
								final += ` ${name}="${val}"`;
							}
						}
					} else if (attr.name.startsWith("@") || attr.name.startsWith("v-on:")) {
						const subName = attr.name.substring(1); // 'click.stop.prevent'
						name = "on:" + subName;
						name = name
							.replace(".stop", "|stopPropagation")
							.replace(".prevent", "|preventDefault")
							.replace(".once", "|once")
							.replace(".capture", "|capture")
							.replace(".self", "|self")
							.replace(".passive", "|passive");
						val = val.replace(/^"|"$/g, "");
						const match = val.match(/\((.*)\)/);
						if (match) {
							if (match[1].includes("$event")) {
								val = "(e) => " + val;
								val = val.replace("$event", "e");
							} else {
								val = "() => " + val;
							}
						}
						final += ` ${name}="{${val}}"`;

						context.hasEmits = true;
						const nameModifiers = subName.split("."); // ['click', 'stop', 'prevent']
						if (context.emits) {
							context.emits.push(nameModifiers[0]);
						} else {
							context.emits = [nameModifiers[0]];
						}
					} else if (attr.name.startsWith("#")) {
						const slotName = attr.name.substring(1);
						final += ` slot="${slotName}"`;
					} else if (attr.name.startsWith("v-once")) {
						final += ` once`;
					} else if (attr.name.startsWith("v-bind")) {
						if (val === '"$attrs"') {
							final += " {...$$restProps}";
						} else {
							val = val.replace(/^"|"$/g, "");
							final += ` {...${val}}`;
						}
					} else if (attr.name.startsWith("v-model:")) {
						val = val.replace(/^"|"$/g, "");
						name = attr.name.replace("v-model", "bind");
						final += ` ${name}="{${val}}"`;
					} else if (attr.name.startsWith("v-model")) {
						val = val.replace(/^"|"$/g, "");
						final += ` bind:v="{${val}}"`;
					} else if (attr.name.startsWith("v-show")) {
						val = val.replace(/^"|"$/g, "");
						final += ` class:hidden="{!${val}}"`;
					} else if (attr.name.startsWith("v-if")) {
						val = val.replace(/^"|"$/g, "");
						pre = `{#if ${val}}`;
					} else if (attr.name.startsWith("v-else-if")) {
						code = code.replace(/\n*\t*{\/if}$/, "");
						val = val.replace(/^"|"$/g, "");
						pre = `{:else if ${val}}`;
					} else if (attr.name.startsWith("v-else")) {
						code = code.replace(/\n*\t*{\/if}$/, "");
						pre = `{:else}`;
					} else if (attr.name.startsWith("v-for")) {
						val = val.replace(/^"|"$/g, "");
						const matches: RegExpMatchArray | null = val.match(
							/^\(?(\w+|{(?:\w+,?\s*)+})(?:,\s*)?(\w+)?\)? in (.*)$/
						);
						if (!matches) {
							throw new Error(`Invalid v-for expression: ${val}`);
						}

						if (matches[2]) {
							pre = `{#each ${matches[3]} as ${matches[1]}, ${matches[2]}}`;
						} else {
							pre = `{#each ${matches[3]} as ${matches[1]}}`;
						}
					} else {
						final += ` ${attr.name}=${val}`;
					}

					return final;
				}, "");

				attrs = attrs.trim();

				attrs = attrs ? " " + attrs + (noClosingTags.has(tagNode.name) ? " />" : ">") : ">";

				if (tagNode.name.startsWith("a") && tagNode.name.length > 1) {
					tagNode.name = tagNode.name.charAt(0).toUpperCase() + tagNode.name.substring(1);
				}

				if (pre) {
					code += "\n" + indent + pre + "\n\t" + indent + "<" + tagNode.name + attrs;

					code += genSvelteTemplate(tagNode.block, context, indent + "\t\t");

					if (!noClosingTags.has(tagNode.name)) {
						code += "\n\t" + indent + "</" + tagNode.name + ">";
					}

					if (pre.includes("{#if")) {
						code += "\n" + indent + "{/if}";
					} else if (pre.includes("{:else")) {
						code += "\n" + indent + "{/if}";
					} else if (pre.includes("{#each")) {
						code += "\n" + indent + "{/each}";
					}
				} else {
					code += "\n" + indent + "<" + tagNode.name + attrs;
					code += genSvelteTemplate(tagNode.block, context, indent + "\t");

					if (!noClosingTags.has(tagNode.name)) {
						code += "\n" + indent + "</" + tagNode.name + ">";
					}
				}
				break;
			default:
				throw new Error("Unknown node type: " + node.type);
		}

		return code;
	}, "");
}
