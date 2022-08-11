interface IAttr {
	name: string;
	val: string;
	line: number;
	column: number;
	mustEscape: boolean;
}
interface ITag {
	type: string;
	name: string;
	selfClosing: boolean;
	block: IBlock;
	attrs: IAttr[];
	attributeBlocks: [];
	isInline: boolean;
	line: number;
	column: number;
}
interface IText {
	type: string;
	val: string;
	line: number;
	column: number;
}
export interface IBlock {
	type: string;
	nodes: (ITag | IText)[];
	line: number;
}

export function getSvelteTemplate(templateAst: IBlock): string {
	let template = genSvelteTemplate(templateAst);
	template += "\n";
	return template.slice(1);
}

export function genSvelteTemplate(templateAst: IBlock, tags: string = ""): string {
	return templateAst.nodes.reduce((code, node) => {
		switch (node.type) {
			case "Text":
				const textNode = node as IText;
				const val = textNode.val.replace(/{{/g, "{").replace(/}}/g, "}");
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
					} else if (attr.name.startsWith(":")) {
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
					} else if (attr.name.startsWith("@")) {
						name = "on:" + attr.name.substring(1);
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
					} else if (attr.name.startsWith("v-model")) {
						val = val.replace(/^"|"$/g, "");
						final += ` bind:value="{${val}}"`;
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
				attrs = attrs ? " " + attrs + ">" : ">";

				if (tagNode.name.startsWith("a-")) {
					const tagName = tagNode.name.substring(2);
					tagNode.name =
						tagNode.name.charAt(0).toUpperCase() +
						tagName.charAt(0).toUpperCase() +
						tagName.slice(1);
				}

				if (pre) {
					code += "\n" + tags + pre + "\n\t" + tags + "<" + tagNode.name + attrs;

					code += genSvelteTemplate(tagNode.block, tags + "\t\t");

					code += "\n\t" + tags + "</" + tagNode.name + ">";

					if (pre.includes("{#if")) {
						code += "\n" + tags + "{/if}";
					} else if (pre.includes("{:else")) {
						code += "\n" + tags + "{/if}";
					} else if (pre.includes("{#each")) {
						code += "\n" + tags + "{/each}";
					}
				} else {
					code += "\n" + tags + "<" + tagNode.name + attrs;
					code += genSvelteTemplate(tagNode.block, tags + "\t");
					code += "\n" + tags + "</" + tagNode.name + ">";
				}
				break;
			default:
				throw new Error("Unknown node type: " + node.type);
		}

		return code;
	}, "");
}
