import { extractTypesFromSource } from "../ast/ast";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import type { NodePath, Node } from "@babel/traverse";
import type { IContext } from "../types";
import { getAvailableImportsFromAst } from "../ast/ast";

export async function getSvelteScript(context: IContext): Promise<string> {
	let template = '<script lang="ts">';
	template += "\n" + (await genSvelteScript(context));
	template += "\n</script>\n";
	return template;
}

export async function genSvelteScript(context: IContext, indent: string = ""): Promise<string> {
	// get imported interfaces from ast
	const { imports } = getAvailableImportsFromAst(context.scriptAst!);
	// get imported interfaces names
	const props = imports.map((s) => s.imported);

	// get actual code for definedProps and defineEmits interfaces
	const { result } = await extractTypesFromSource(context.scriptContent ?? "", props, {
		relativePath: context.path ?? "",
		ast: context.scriptAst,
		isInternal: true,
	});

	if (!result.size) {
		throw new Error("No interfaces found: " + props);
	}

	context.result = result;

	// traverse ast
	traverse(context.scriptFile as Node, {
		enter(path) {
			// console.log(path.node);
		},
		Program(path) {
			// insert node at the beginning of script body
			if (!context.noComputedFile?.has(context.fromFileName ?? "")) {
				// will parse to
				// import { configStore } from "../config";
				path.unshiftContainer(
					"body",
					t.importDeclaration(
						[t.importSpecifier(t.identifier("configStore"), t.identifier("configStore"))],
						t.stringLiteral("../config")
					) as Node
				);
			}
		},
		ImportDeclaration(path) {
			// import ... from ...
			transformImportDeclaration(path, context);
		},
		VariableDeclaration(path) {
			// const variable = ...
			transformVariableDeclaration(path, context);
		},
		ExpressionStatement(path) {
			// sum = 1 + 1
			transformExpressionStatement(path, context);
		},
		CallExpression(path) {
			// function(...)
			transformCallExpression(path, context);
		},
		MemberExpression(path) {
			// variable.property || variable.propertyFunction(...)
			transformMemberExpression(path, context);
		},
		IfStatement(path) {
			// if (x === y) { ... }
			transformIfStatement(path, context);
		},
	});

	// generate code from transformed ast
	const output = generate(context.scriptAst! as Node);

	return output.code.replace(/\n\n/g, "\n");
}

export function transformImportDeclaration(path: NodePath<t.ImportDeclaration>, context: IContext) {
	const { node } = path;
	const { source, specifiers } = node;
	const { value } = source;
	if (context.noImport?.has(value)) {
		path.remove();
	}

	if (value.includes(".vue")) {
		source.value = value.replace(".vue", ".svelte");
	}

	for (const [i, name] of specifiers
		.map((s) =>
			t.isImportSpecifier(s)
				? t.isIdentifier((s as t.ImportSpecifier).imported)
					? ((s as t.ImportSpecifier).imported as t.Identifier).name
					: ""
				: ""
		)
		.filter(Boolean)
		.entries()) {
		if (value === "@agufaui/theme" && name.startsWith("C") && name.endsWith("Name")) {
			context.componentName = name;
		}

		if (name.endsWith("Emits")) {
			context.hasEmits = true;
			const disptchImport = t.importDeclaration(
				[
					t.importSpecifier(
						t.identifier("createEventDispatcher"),
						t.identifier("createEventDispatcher")
					),
				],
				t.stringLiteral("svelte")
			);
			path.insertBefore(disptchImport as Node);

			// replace "*Emits" to "*EmitsS"
			const specificier = specifiers[i];
			const imported = (specificier as t.ImportSpecifier).imported as t.Identifier;
			const local = (specificier as t.ImportSpecifier).local as t.Identifier;
			imported.name = imported.name + "S";
			local.name = local.name + "S";
		}

		if (name === "useLocale") {
			const localeImport = t.importDeclaration(
				[t.importSpecifier(t.identifier("tr"), t.identifier("tr"))],
				t.stringLiteral("../locale")
			);
			path.insertBefore(localeImport as Node);
		}

		if (value === "@vueuse/components" && name === "vOnClickOutside") {
			const helperImport = t.importDeclaration(
				[t.importSpecifier(t.identifier("clickOutside"), t.identifier("clickOutside"))],
				t.stringLiteral("../helper")
			);

			path.insertBefore(helperImport as Node);
		}
	}

	if (["@agufaui/usevue", "@vueuse/components"].includes(value)) {
		path.remove();
	}
}

export function transformVariableDeclaration(
	path: NodePath<t.VariableDeclaration>,
	context: IContext
) {
	const { node } = path;
	const { declarations } = node;

	for (let i = 0; i < declarations.length; i++) {
		const declaration = declarations[i];

		// eg. const {cspacex, cclosec} = computedProperties;
		if (t.isIdentifier(declaration.init)) {
			const identifier = declaration.init as t.Identifier;
			switch (identifier.name) {
				case "computedProperties":
					path.remove();
					break;
			}
		}

		// eg. const props = defineProps<IAMdropdownProps>();
		if (t.isCallExpression(declaration.init)) {
			const callExpression = declaration.init as t.CallExpression;
			if (t.isIdentifier(callExpression.callee)) {
				const identifier = callExpression.callee as t.Identifier;
				switch (identifier.name) {
					case "withDefaults":
						const iprops = getWithDefaults(callExpression, context);
						path.insertBefore(
							t.tsTypeAliasDeclaration(
								t.identifier("$$Props"),
								undefined,
								t.tsTypeReference(t.identifier(iprops))
							) as Node
						);

						getTypeDef(path, iprops, context);
						path.remove();
						break;
					case "defineProps":
						// path: const props = defineProps<IxxxProps>();
						transformDefineProps(callExpression, path, context);
						break;
					case "defineEmits":
						const iemits = getTSDefine(callExpression);
						// path.insertBefore(
						// 	t.tsTypeAliasDeclaration(
						// 		t.identifier("$$Events"),
						// 		undefined,
						// 		t.tsTypeReference(t.identifier(iemits))
						// 	)
						// );

						const dispatchCallExpression = t.callExpression(
							t.identifier("createEventDispatcher"),
							[]
						);
						dispatchCallExpression.typeParameters = t.tsTypeParameterInstantiation([
							t.tsTypeReference(t.identifier(iemits + "S")),
						]);
						path.insertBefore(
							t.variableDeclaration("const", [
								t.variableDeclarator(t.identifier("dispatch"), dispatchCallExpression),
							]) as Node
						);

						path.remove();
						break;
					case "inject":
					case "useVue":
					case "useLocale":
					case "getComputedFromProps":
						path.remove();
						break;
				}
			}
		}

		// eg. const obj = { name: "hi", age: 16}
		if (t.isObjectExpression(declaration.init)) {
			const identifier = declaration.id as t.Identifier;
			switch (identifier.name) {
				case "defaultPropValues":
					for (const prop of (declaration.init as t.ObjectExpression)
						.properties as t.ObjectProperty[]) {
						const { key, value } = prop;
						if (key.type !== "Identifier") {
							throw new Error("Second argument must be ObjectExpression with Identifier keys");
						}

						if (!context.defaultValues) {
							context.defaultValues = {};
						}

						context.defaultValues[(key as t.Identifier).name] = value;
					}
					path.remove();
					break;
			}
		}

		// eg. const getComponent = (name: string) => { ... }
		if (t.isArrowFunctionExpression(declaration.init)) {
			const identifier = declaration.id as t.Identifier;
			const arrowFuncExpression = declaration.init as t.ArrowFunctionExpression;

			switch (identifier.name) {
				case "getComponent":
					const functionBody = arrowFuncExpression.body as t.BlockStatement;
					const bodyNodes: t.Statement[] = functionBody.body;

					if (bodyNodes.length > 0) {
						const firstNode = bodyNodes[0];
						// remove node if it's test for dropdown recursive dynamic component
						// eg. if (name === "dropdown") { ... }
						if (t.isIfStatement(firstNode)) {
							const testNode = firstNode.test;
							if (t.isBinaryExpression(testNode) && t.isStringLiteral(testNode.right)) {
								if (testNode.right.value.includes("dropdown")) {
									bodyNodes.unshift();
								}
							}
						}
					}

					arrowFuncExpression.async = true;

					break;
			}
		}
	}
}

export function transformCallExpression(path: NodePath<t.CallExpression>, context: IContext) {
	const { node } = path;
	if (t.isIdentifier(node.callee)) {
		switch (node.callee.name) {
			case "ref":
				path.replaceWith(node.arguments[0] as Node);

				if (!context.refs) {
					context.refs = new Map<string, string>();
				}

				const refVar = ((path.parent as t.VariableDeclarator).id as t.Identifier).name;
				const valueNode = node.arguments[0];
				let valueType = "";
				if (t.isBooleanLiteral(valueNode)) {
					valueType = "boolean";
				} else if (t.isStringLiteral(valueNode)) {
					valueType = "string";
				} else if (t.isNumericLiteral(valueNode)) {
					valueType = "number";
				} else if (t.isMemberExpression(valueNode)) {
					const memberTypeNode = node.typeParameters?.params[0];
					if (t.isTSNumberKeyword(memberTypeNode)) {
						valueType = "number";
					}

					path.replaceWith(valueNode.object);
				}

				context.refs.set(refVar, valueType);
				break;
			case "reactive":
				path.replaceWith(node.arguments[0] as Node);

				if (!context.reactives) {
					context.reactives = new Array<string>();
				}
				context.reactives.push(((path.parent as t.VariableDeclarator).id as t.Identifier).name);
				break;
			case "emits":
				path.replaceWith(t.callExpression(t.identifier("dispatch"), node.arguments) as Node);
				break;
			case "defineAsyncComponent":
				const arrowFuncExpression = node.arguments[0] as t.ArrowFunctionExpression;
				// eg. import(...)
				const importCallExpression = arrowFuncExpression.body as t.CallExpression;
				const templateLiteral = importCallExpression.arguments[0] as t.TemplateLiteral;
				// change .vue to .svelte
				for (const quasis of templateLiteral.quasis) {
					const value = quasis.value;
					if (value.raw.includes(".vue")) {
						value.raw = ".svelte";
					}

					if (value.cooked?.includes(".vue")) {
						value.cooked = ".svelte";
					}
				}

				// defineAsyncComponent(() => import(`../menu${subName}/Am${name}.vue`))
				// will parse to
				// (await import(`../menu${subName}/Am${name}.svelte`)).default
				const awaitExpression = t.awaitExpression(importCallExpression);
				awaitExpression.extra = { parenthesized: true };
				const memberExpression = t.memberExpression(awaitExpression, t.identifier("default"));
				const awaitExpressionStatement = t.expressionStatement(memberExpression);

				path.replaceWith(awaitExpressionStatement as Node);
				break;
			case "defineProps":
				// path: defineProps<IxxxProps>();
				transformDefineProps(node, path, context);
				break;
		}
	}
}

export function transformExpressionStatement(
	path: NodePath<t.ExpressionStatement>,
	context: IContext
) {
	const { node } = path;

	switch (node.expression.type) {
		case "CallExpression":
			const callExpression = node.expression as t.CallExpression;
			switch (callExpression.callee.type) {
				case "Identifier":
					const identifier = callExpression.callee as t.Identifier;
					switch (identifier.name) {
						case "watch":
							if (callExpression.arguments.length >= 2) {
								const arrowFunc = callExpression.arguments[1] as t.ArrowFunctionExpression;
								if (t.isBlockStatement(arrowFunc.body)) {
									const labelStatement = t.labeledStatement(
										t.identifier("$"),
										arrowFunc.body as t.BlockStatement
									);

									path.replaceWith(labelStatement as Node);
								}
							}
							break;
					}
					break;
			}
	}
}

export function transformMemberExpression(path: NodePath<t.MemberExpression>, context: IContext) {
	const { node } = path;
	let name = "";
	let property = "";

	if (t.isIdentifier(node.object)) {
		name = node.object.name;
	}

	if (t.isIdentifier(node.property)) {
		property = node.property.name;
	}

	// replace ref.value to ref
	if (property === "value" && context.refs?.has(name)) {
		path.replaceWith(node.object as Node);
	}

	// replace cref.value to cref
	if (property === "value" && name.startsWith("c")) {
		path.replaceWith(node.object as Node);
	}

	if (name === "props") {
		path.replaceWith(node.property as Node);
	}
}

export function transformIfStatement(path: NodePath<t.IfStatement>, context: IContext) {
	const { node } = path;

	if (t.isBinaryExpression(node.test)) {
		const binaryExp = node.test as t.BinaryExpression;
		if (t.isStringLiteral(binaryExp.right)) {
			const stringLit = binaryExp.right as t.StringLiteral;
			if (context.recursiveComponentsInfo) {
				for (const recursiveComponentInfo of context.recursiveComponentsInfo) {
					if (context.path?.includes(recursiveComponentInfo.fileName)) {
						if (stringLit.value === recursiveComponentInfo.matchName) {
							path.remove();
							break;
						}
					}
				}
			}
		}
	}
}

/**
 *  get type annotation of a call expression
 *  @example
 *  // returns IAMdropdownProps
 *  withDefault(defineProps<IAMdropdownProps>(), { vc: "text-lg", c: "text-sm"})
 *  @param {t.CallExpression} callExpression - call expression
 * *  @param {IContext} context - context
 *  @returns {string}
 */
function getWithDefaults(callExpression: t.CallExpression, context: IContext): string {
	const args = callExpression.arguments;
	if (args.length !== 2) {
		throw new Error("withDefaults takes exactly 2 arguments");
	}
	const [defineProps, defaultValues] = args as [t.CallExpression, t.ObjectExpression];
	const { callee, typeParameters } = defineProps;

	if ((callee as t.Identifier).name !== "defineProps") {
		throw new Error(
			"withDefaults first argument must be CallExpression with Identifier callee named defineProps"
		);
	}

	const iprops: string = (
		((typeParameters as t.TSTypeParameterInstantiation).params[0] as t.TSTypeReference)
			.typeName as t.Identifier
	).name;

	for (const prop of (defaultValues as t.ObjectExpression).properties as t.ObjectProperty[]) {
		const { key, value } = prop;
		if (key.type !== "Identifier") {
			throw new Error("withDefaults second argument must be ObjectExpression with Identifier keys");
		}

		if (!context.defaultValues) {
			context.defaultValues = {};
		}

		context.defaultValues[(key as t.Identifier).name] = value;
	}

	return iprops;
}

/**
 *  get type annotation of a call expression
 *  @example
 *  // returns IAMdropdownProps
 *  defineProps<IAMdropdownProps>()
 *  @param {t.CallExpression} callExpression - call expression
 *  @returns {string}
 */
function getTSDefine(callExpression: t.CallExpression): string {
	const { callee, typeParameters } = callExpression;

	const iprops: string = (
		((typeParameters as t.TSTypeParameterInstantiation).params[0] as t.TSTypeReference)
			.typeName as t.Identifier
	).name;

	return iprops;
}

/**
 *  transform DefinedProps expression
 *  @example
 *  // defineProps<IAMdropdownProps>() will parse to
 *  type $$Props = IAMdropdownProps;
 *  export let v: $$Props["v"];
 *  export let c: $$Props["c"] = undefined;
 *  $: cc = ($configStore.getFieldValue(CAMdropdownName, t, "c") ?? "") + (c ? " " + c : "");
 *  export let ipos: $$Props["ipos"] = undefined;
 *  $: cipos = ipos ?? $configStore.getFieldValue(CAMdropdownName, t, "ipos");
 *  export let arrowi: $$Props["arrowi"] = undefined;
 *  $: carrowi = arrowi ?? $configStore.getFieldValue(CAMdropdownName, t, "arrowi") ?? "i-ion:arrow-down-b";
 *  @param {NodePath<t.VariableDeclaration | t.CallExpression>} path - the node path of code ast
 *  @param {string} iprops - interface name for props: IxxxProps
 *  @param {IContext} context - context of this script
 */
function transformDefineProps(
	node: t.CallExpression,
	path: NodePath<t.VariableDeclaration | t.CallExpression>,
	context: IContext
): void {
	// get type, eg. idprops: IAMdropdownProps
	const idprops = getTSDefine(node);

	// will parse to
	// type $$Props = IAMdropdownProps;
	path.insertBefore(
		t.tsTypeAliasDeclaration(
			t.identifier("$$Props"),
			undefined,
			t.tsTypeReference(t.identifier(idprops))
		) as Node
	);

	getTypeDef(path, idprops, context);
	path.remove();
}

/**
 *  Generates props declaration statements and props generated computed properties declaration statements
 *  @param {NodePath<t.VariableDeclaration | t.CallExpression>} path - the node path of code ast
 *  @param {string} iprops - interface name for props: IxxxProps
 *  @param {IContext} context - context of this script
 */
function getTypeDef(
	path: NodePath<t.VariableDeclaration | t.CallExpression>,
	iprops: string,
	context: IContext
): void {
	// get interface IxxxProps definition, eg. icode:
	// interface IAMitemProps {
	//   t?: string;
	//   c?: string;
	//   item: TAMItem;
	// }
	const icode = context.result?.get(iprops);

	if (icode) {
		// extrace interface definition members, eg. matchArray:
		// [ 't?: string', 'c?: string', 'item: TAMItem' ]
		const matchArray = icode.match(/(\w+)(\?)?:\s*(\w+\[?\]?)/g);

		if (matchArray) {
			for (const match of matchArray) {
				let [prop, propType] = match.split(/\??:/); // split ':' or '?:' separactor
				prop = prop.trim(); // eg. t, c, item
				propType = propType.trim(); // eg. string, string, TAMItem

				// {
				//   type: 'TSIndexedAccessType',
				//   objectType: {
				//     type: 'TSTypeReference',
				//     typeName: { type: 'Identifier', name: '$$Props' },
				//     typeParameters: null
				//   },
				//   indexType: {
				//     type: 'TSLiteralType',
				//     literal: { type: 'StringLiteral', value: 't' }
				//   }
				// }
				const typeProp = t.tsIndexedAccessType(
					t.tsTypeReference(t.identifier("$$Props")),
					t.tsLiteralType(t.stringLiteral(prop))
				);

				// { type: 'Identifier', name: 't' }
				const identityProp = t.identifier(prop);

				// {
				//   type: 'Identifier',
				//   name: 't',
				//   typeAnnotation: {
				//     type: 'TSTypeAnnotation',
				//     typeAnnotation: {
				//       type: 'TSIndexedAccessType',
				//       objectType: [Object],
				//       indexType: [Object]
				//     }
				//   }
				// }
				identityProp.typeAnnotation = t.tsTypeAnnotation(typeProp);

				// {
				//   type: 'ExportNamedDeclaration',
				//   declaration: {
				//     type: 'VariableDeclaration',
				//     kind: 'let',
				//     declarations: [ [Object] ]
				//   },
				//   specifiers: [],
				//   source: null
				// }
				//
				// will be parsed into
				//
				// export let t: $$Props["t"] = undefined;
				//
				// or
				//
				// export let item: $$Props["item"];
				path.insertBefore(
					t.exportNamedDeclaration(
						t.variableDeclaration("let", [
							match.includes("?")
								? t.variableDeclarator(identityProp, t.identifier("undefined"))
								: t.variableDeclarator(identityProp),
						])
					) as Node
				);

				// if this prop doesn't need to generate computed property
				if (context.noComputedProp?.has(prop)) continue;
				if (context.noComputedFile?.has(context.fromFileName ?? "")) continue;
				if (propType === "boolean") continue;
				if (propType.includes("[]")) continue;

				// if prop needs to generate computed property
				if (prop.endsWith("c")) {
					// if prop is a "class" property

					// {
					//   type: 'MemberExpression',
					//   object: { type: 'Identifier', name: '$configStore' },
					//   property: { type: 'Identifier', name: 'getFieldValue' },
					//   computed: false,
					//   optional: null
					// }
					const memberExp = t.memberExpression(
						t.identifier("$configStore"),
						t.identifier("getFieldValue")
					);

					// {
					//   type: 'CallExpression',
					//   callee: {
					//     type: 'MemberExpression',
					//     object: { type: 'Identifier', name: '$configStore' },
					//     property: { type: 'Identifier', name: 'getFieldValue' },
					//     computed: false,
					//     optional: null
					//   },
					//   arguments: [
					//     { type: 'Identifier', name: 'CAMlinkName' },
					//     { type: 'Identifier', name: 't' },
					//     { type: 'StringLiteral', value: 'c' }
					//   ]
					// }
					//
					// will parse to
					//
					// $configStore.getFieldValue(CAMsidebarName, t, "c")
					const callExp = t.callExpression(memberExp, [
						t.identifier(context.componentName!),
						t.identifier("t"),
						t.stringLiteral(prop),
					]);

					// {
					//   type: 'LogicalExpression',
					//   operator: '??',
					//   left: {
					//     type: 'CallExpression',
					//     callee: {
					//       type: 'MemberExpression',
					//       object: [Object],
					//       property: [Object],
					//       computed: false,
					//       optional: null
					//     },
					//     arguments: [ [Object], [Object], [Object] ]
					//   },
					//   right: { type: 'StringLiteral', value: '' },
					//   extra: { parenthesized: true }
					// }
					//
					// will parse to
					//
					// ($configStore.getFieldValue(CAMsidebarName, t, "c") ?? "")
					const logicalExp = t.logicalExpression("??", callExp, t.stringLiteral(""));
					logicalExp.extra = { parenthesized: true };

					// {
					//   type: 'ConditionalExpression',
					//   test: { type: 'Identifier', name: 'c' },
					//   consequent: {
					//     type: 'BinaryExpression',
					//     operator: '+',
					//     left: { type: 'StringLiteral', value: ' ' },
					//     right: { type: 'Identifier', name: 'c' }
					//   },
					//   alternate: { type: 'StringLiteral', value: '' },
					//   extra: { parenthesized: true }
					// }
					//
					// will parse to
					//
					// (c ? ' ' + c : c)
					const ConditionalExp = t.conditionalExpression(
						t.identifier(prop),
						t.binaryExpression("+", t.stringLiteral(" "), t.identifier(prop)),
						t.stringLiteral("")
					);
					ConditionalExp.extra = { parenthesized: true };

					// will parse to
					// ($configStore.getFieldValue(CAMsidebarName, t, "c") ?? "") + (c ? ' ' + c : c)
					const binaryExp = t.binaryExpression("+", logicalExp, ConditionalExp);
					// will parse to
					// cc = ($configStore.getFieldValue(CAMsidebarName, t, "c") ?? "") + (c ? ' ' + c : c)
					const assignmentExp = t.assignmentExpression("=", t.identifier("c" + prop), binaryExp);
					// Create statement based on expression
					const expStatement = t.expressionStatement(assignmentExp);
					// will parse to
					// $: cc = ($configStore.getFieldValue(CAMsidebarName, t, "c") ?? "") + (c ? ' ' + c : c)
					const labelStatement = t.labeledStatement(t.identifier("$"), expStatement);

					path.insertBefore(labelStatement as Node);
				} else {
					// if prop is not a "class" property

					// get default value of prop, eg. iconDefaultValue: "i-ion:arrow-down-b"
					const defaultValue = context.defaultValues?.[prop];

					const memberExp = t.memberExpression(
						t.identifier("$configStore"),
						t.identifier("getFieldValue")
					);

					// will parse to
					// $configStore.getFieldValue(CABadgeName, t, "i")
					const callExp = t.callExpression(memberExp, [
						t.identifier(context.componentName!),
						t.identifier("t"),
						t.stringLiteral(prop),
					]);

					let logicalExp;
					if (defaultValue) {
						// will parse to
						// i ?? $configStore.getFieldValue(CABadgeName, t, "i") ?? "i-ion:arrow-down-b"
						const defaultLogicalExp = t.logicalExpression("??", callExp, defaultValue);
						logicalExp = t.logicalExpression("??", t.identifier(prop), defaultLogicalExp);
					} else {
						// will parse to
						// i ?? $configStore.getFieldValue(CABadgeName, t, "i")
						logicalExp = t.logicalExpression("??", t.identifier(prop), callExp);
					}

					// will parse to
					// ci = i ?? $configStore.getFieldValue(CABadgeName, t, "i")
					const assignmentExp = t.assignmentExpression("=", t.identifier("c" + prop), logicalExp);
					// Create statement based on expression
					const expStatement = t.expressionStatement(assignmentExp);
					// will parse to
					// $: ci = i ?? $configStore.getFieldValue(CABadgeName, t, "i")
					const labelStatement = t.labeledStatement(t.identifier("$"), expStatement);

					path.insertBefore(labelStatement as Node);
				}
			}
		}
	}
}
