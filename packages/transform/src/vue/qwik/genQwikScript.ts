import { extractTypesFromSource } from "../ast/ast";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import type { NodePath, Node } from "@babel/traverse";
import type { IContext } from "../types";
import { getAvailableImportsFromAst } from "../ast/ast";

export const HtmlTemplatePlaceHolder = "HtmlTemplatePlaceHolder";

let qwikImportDeclaration: t.ImportDeclaration;
let qwikComponentDeclarationParams: t.ObjectPattern;
let programPath: NodePath<t.Program>;

export async function getQwikScript(context: IContext): Promise<string> {
	const template = await genQwikScript(context);
	return template;
}

export async function genQwikScript(context: IContext, indent: string = ""): Promise<string> {
	// get imported interfaces from ast
	const { imports } = getAvailableImportsFromAst(context.scriptAst!);
	// get imported interfaces names
	const iprops = imports.map((s) => s.imported);

	// get actual code for definedProps and defineEmits interfaces
	const { result } = await extractTypesFromSource(context.scriptContent ?? "", iprops, {
		relativePath: context.path ?? "",
		ast: context.scriptAst,
		isInternal: true,
	});

	if (!result.size) {
		throw new Error("No interfaces found: " + iprops);
	}

	context.result = result;

	// traverse ast
	traverse(context.scriptFile as Node, {
		enter(path) {
			// console.log(path.node);
		},
		Program(path) {
			programPath = path;

			// insert node at the beginning of script body
			// will parse to
			// import { component$, useStore } from "@builder.io/qwik";
			const imports: t.ImportSpecifier[] = [
				t.importSpecifier(t.identifier("component$"), t.identifier("component$")),
			];
			if (!context.noComputedFile?.has(context.fromFileName ?? "")) {
				imports.push(
					t.importSpecifier(t.identifier("createContextId"), t.identifier("createContextId"))
				);
				imports.push(t.importSpecifier(t.identifier("useContext"), t.identifier("useContext")));
				imports.push(t.importSpecifier(t.identifier("useTask$"), t.identifier("useTask$")));
				imports.push(t.importSpecifier(t.identifier("useStore"), t.identifier("useStore")));
			}

			qwikImportDeclaration = t.importDeclaration(imports, t.stringLiteral("@builder.io/qwik"));

			path.unshiftContainer("body", qwikImportDeclaration as Node);

			// import type { IConfig, TConfig } from "@agufaui/config";
			// import { CConfigProvideName, Config } from "@agufaui/config";
			if (!context.noComputedFile?.has(context.fromFileName ?? "")) {
				path.unshiftContainer(
					"body",
					t.importDeclaration(
						[
							t.importSpecifier(
								t.identifier("CConfigProvideName"),
								t.identifier("CConfigProvideName")
							),
							t.importSpecifier(t.identifier("Config"), t.identifier("Config")),
						],
						t.stringLiteral("@agufaui/config")
					)
				);

				const importTypes = t.importDeclaration(
					[
						t.importSpecifier(t.identifier("IConfig"), t.identifier("IConfig")),
						t.importSpecifier(t.identifier("TConfig"), t.identifier("TConfig")),
					],
					t.stringLiteral("@agufaui/config")
				);

				importTypes.importKind = "type";

				path.unshiftContainer("body", importTypes);
			}

			/*
			 * add 'export default component$(()=>{})' to code body
			 */
			// create arrow function params ()
			const params = t.objectPattern([
				t.objectProperty(t.identifier("props"), t.identifier("props"), false, true),
			]);
			qwikComponentDeclarationParams = params;
			// create arrow function body block
			const statements: t.Statement[] = [];
			// import declaration nodes stays with body, other nodes go into statements
			path.node.body = path.node.body.filter((node) => {
				if (t.isImportDeclaration(node)) {
					return true;
				} else {
					if (t.isVariableDeclaration(node) && t.isIdentifier(node.declarations[0].id)) {
						const ident = node.declarations[0].id as t.Identifier;
						if (ident.name === "props") {
							ident.name = "prop";
						}
					}
					statements.push(node);
					return false;
				}
			});
			// will parse to 'return "HtmlTemplatePlaceHolder"'
			statements.push(t.returnStatement(t.stringLiteral(HtmlTemplatePlaceHolder)));
			const block = t.blockStatement(statements);
			path.node.body.push(
				t.exportDefaultDeclaration(
					t.callExpression(t.identifier("component$"), [t.arrowFunctionExpression([params], block)])
				)
			);
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
		source.value = value.replace(".vue", "");
		if (!context.childComponents) {
			context.childComponents = new Array<string>();
		}
		// eg. [ 'Asup', 'Abadge' ]
		context.childComponents.push(specifiers[0].local.name);
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
		if (value === "@agufaui/theme" && name.startsWith("CA") && name.endsWith("Name")) {
			context.componentName = name;
		}

		if (value === "@agufaui/theme" && name.startsWith("IA") && name.endsWith("Props")) {
			const qwikInterfaceWrapperName = name + "Qwik";

			// insert new interface declaration that wraps IAxxxProps: IAxxxPropsQwik
			// interface IAAlertPropsQwik {
			//    props: IAAlertProps;
			// }
			const qwikInterfaceDeclaration = t.tsInterfaceDeclaration(
				t.identifier(qwikInterfaceWrapperName),
				null,
				null,
				t.tsInterfaceBody([
					t.tsPropertySignature(
						t.identifier("props"),
						t.tsTypeAnnotation(t.tsTypeReference(t.identifier(name)))
					),
				])
			);
			programPath.node.body.push(qwikInterfaceDeclaration);
			// assign type to component$ argument eg. component$(({ props }: IAbuttonPropsQwik) => {...})
			qwikComponentDeclarationParams.typeAnnotation = t.tsTypeAnnotation(
				t.tsTypeReference(t.identifier(qwikInterfaceWrapperName))
			);
			continue;
		}

		if (name.endsWith("Emits")) {
			context.hasEmits = true;
			// remove IAxxxEmits named import
			specifiers.splice(i, 1);
			continue;
		}

		if (name === "useLocale") {
			const localeImport = t.importDeclaration(
				[t.importSpecifier(t.identifier("tr"), t.identifier("tr"))],
				t.stringLiteral("../../locale")
			);
			path.insertBefore(localeImport as Node);
		}

		if (value === "@vueuse/components" && name === "vOnClickOutside") {
			const helperImport = t.importDeclaration(
				[t.importSpecifier(t.identifier("clickOutside"), t.identifier("clickOutside"))],
				t.stringLiteral("../../helper")
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

						getTypeDef(path, iprops, context);
						path.remove();
						break;
					case "defineProps":
						// path: const props = defineProps<IxxxProps>();
						transformDefineProps(callExpression, path, context);
						break;
					case "defineEmits":
						const iemits = getTSDefine(callExpression);

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
				// let show = ref(false)
				// will parse to
				// const show = useSignal(false)
				if ((path.parentPath.parentPath?.node as t.VariableDeclaration).kind) {
					(path.parentPath.parentPath?.node as t.VariableDeclaration).kind = "const";
				}

				node.callee.name = "useSignal";

				// import { ..., useSignal } from "builder.io/qwik"
				qwikImportDeclaration.specifiers.filter((s) => s.local.name === "useSignal").length === 0 &&
					qwikImportDeclaration.specifiers.push(
						t.importSpecifier(t.identifier("useSignal"), t.identifier("useSignal"))
					);

				if (!context.refs) {
					context.refs = new Array<string>();
				}
				context.refs.push(((path.parent as t.VariableDeclarator).id as t.Identifier).name);
				break;
			case "reactive":
				path.replaceWith(node.arguments[0] as Node);

				if (!context.reactives) {
					context.reactives = new Array<string>();
				}
				context.reactives.push(((path.parent as t.VariableDeclarator).id as t.Identifier).name);
				break;
			case "emits":
				// path.replaceWith(t.callExpression(t.identifier("dispatch"), node.arguments) as Node);
				path.remove();
				break;
			case "defineAsyncComponent":
				const arrowFuncExpression = node.arguments[0] as t.ArrowFunctionExpression;
				// eg. import(...)
				const importCallExpression = arrowFuncExpression.body as t.CallExpression;
				const templateLiteral = importCallExpression.arguments[0] as t.TemplateLiteral;
				// change .vue to .qwik
				for (const quasis of templateLiteral.quasis) {
					const value = quasis.value;
					if (value.raw.includes(".vue")) {
						value.raw = ".qwik";
					}

					if (value.cooked?.includes(".vue")) {
						value.cooked = ".qwik";
					}
				}

				// defineAsyncComponent(() => import(`../menu${subName}/Am${name}.vue`))
				// will parse to
				// (await import(`../menu${subName}/Am${name}.qwik`)).default
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
								// (show) => { showAlert.value = show ? true : false; }
								const arrowFunc = callExpression.arguments[1] as t.ArrowFunctionExpression;
								const funcBody: t.Statement[] = [];
								let paramName: string = "";

								if (arrowFunc.params.length > 0) {
									// paramName = "show"
									paramName = (t.isIdentifier(arrowFunc.params[0]) &&
										arrowFunc.params[0].name) as string;
								}

								if (t.isBlockStatement(arrowFunc.body)) {
									for (const statement of arrowFunc.body.body) {
										if (t.isExpressionStatement(statement)) {
											const exp = statement as t.ExpressionStatement;
											if (t.isAssignmentExpression(exp.expression)) {
												const assign = exp.expression as t.AssignmentExpression;
												if (t.isConditionalExpression(assign.right)) {
													const con = assign.right as t.ConditionalExpression;
													if (t.isIdentifier(con.test)) {
														if (paramName === con.test.name) {
															con.test.name = "props." + con.test.name;
															funcBody.push(statement);
														}
													}
												}
											}
										}
									}
								}

								const useTaskExpStatement = t.expressionStatement(
									t.callExpression(t.identifier("useTask$"), [
										t.arrowFunctionExpression(
											[
												t.objectPattern([
													t.objectProperty(
														t.identifier("track"),
														t.identifier("track"),
														false,
														true
													),
												]),
											],
											t.blockStatement([
												t.expressionStatement(
													t.callExpression(t.identifier("track"), [callExpression.arguments[0]])
												),
												...funcBody,
											])
										),
									])
								);

								path.replaceWith(useTaskExpStatement as Node);
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
	// get type, eg. idprops = 'IAMdropdownProps'
	const idprops = getTSDefine(node);

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
			let noComputed = true;

			// store computed properties variable names
			// eg. const state = useStore({ counter: 0, name: "" })
			const useStoreObjectProperties: t.ObjectProperty[] = [];
			for (const match of matchArray) {
				let [prop, propType] = match.split(/\??:/); // split ':' or '?:' separactor
				prop = prop.trim(); // eg. t, c, item
				propType = propType.trim(); // eg. string, string, TAMItem

				// if this prop doesn't need to generate computed property
				if (context.noComputedProp?.has(prop)) continue;
				if (context.noComputedFile?.has(context.fromFileName ?? "")) continue;
				if (propType === "boolean") continue;
				if (propType.includes("[]")) continue;

				noComputed = false;

				// initializle properties for useStore object
				// eg. { counter: 0, name: "" }
				const computedPropertyName = "c" + prop;
				switch (propType) {
					case "number":
						useStoreObjectProperties.push(
							t.objectProperty(t.identifier(computedPropertyName), t.numericLiteral(0))
						);
						break;
					default:
						useStoreObjectProperties.push(
							t.objectProperty(t.identifier(computedPropertyName), t.stringLiteral(""))
						);
				}
			}

			if (!noComputed) {
				// eg. const state = useStore({ counter: 0, name: "" })
				const useStore = t.variableDeclaration("const", [
					t.variableDeclarator(
						t.identifier("state"),
						t.callExpression(t.identifier("useStore"), [
							t.objectExpression(useStoreObjectProperties),
						])
					),
				]);
				path.insertBefore(useStore as Node);

				// get qwik context config
				// const CTX = createContextId<TConfig>(CConfigProvideName);
				const contextIdCall = t.callExpression(t.identifier("createContextId"), [
					t.identifier("CConfigProvideName"),
				]);
				contextIdCall.typeParameters = t.tsTypeParameterInstantiation([
					t.tsTypeReference(t.identifier("TConfig")),
				]);
				const createContextId = t.variableDeclaration("const", [
					t.variableDeclarator(t.identifier("CTX"), contextIdCall),
				]);
				path.insertBefore(createContextId as Node);
				// const tConfig = useContext(CTX);
				const useContextCall = t.callExpression(t.identifier("useContext"), [t.identifier("CTX")]);
				const objTConfig = t.identifier("tconfig");
				const useContext = t.variableDeclaration("const", [
					t.variableDeclarator(objTConfig, useContextCall),
				]);
				path.insertBefore(useContext as Node);
				// const config: IConfig = new Config();
				const newIConfigConstructor = t.newExpression(t.identifier("Config"), []);
				const objIConfig = t.identifier("iconfig");
				objIConfig.typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier("IConfig")));
				const newIConfig = t.variableDeclaration("const", [
					t.variableDeclarator(objIConfig, newIConfigConstructor),
				]);
				path.insertBefore(newIConfig as Node);
				// iconfig.locale = tConfig.locale;
				// iconfig.locales = tConfig.locales;
				// iconfig.userTheme = tConfig.userTheme;
				const locale = t.expressionStatement(
					t.assignmentExpression(
						"=",
						t.memberExpression(t.identifier("iconfig"), t.identifier("locale")),
						t.memberExpression(t.identifier("tconfig"), t.identifier("locale"))
					)
				);
				path.insertBefore(locale as Node);
				const locales = t.expressionStatement(
					t.assignmentExpression(
						"=",
						t.memberExpression(t.identifier("iconfig"), t.identifier("locales")),
						t.memberExpression(t.identifier("tconfig"), t.identifier("locales"))
					)
				);
				path.insertBefore(locales as Node);
				const userTheme = t.expressionStatement(
					t.assignmentExpression(
						"=",
						t.memberExpression(t.identifier("iconfig"), t.identifier("userTheme")),
						t.memberExpression(t.identifier("tconfig"), t.identifier("userTheme"))
					)
				);
				path.insertBefore(userTheme as Node);
			}

			// create computed properties
			for (const match of matchArray) {
				let [prop, propType] = match.split(/\??:/); // split ':' or '?:' separactor
				prop = prop.trim(); // eg. t, c, item
				propType = propType.trim(); // eg. string, string, TAMItem

				// if this prop doesn't need to generate computed property
				if (
					context.noComputedProp?.has(prop) ||
					context.noComputedFile?.has(context.fromFileName ?? "") ||
					propType === "boolean" ||
					propType.includes("[]")
				) {
					if (!context.notComputedProps) {
						context.notComputedProps = new Array<string>();
					}
					context.notComputedProps.push(prop);
					continue;
				}

				const computedPropertyName = "c" + prop;

				let computedPropertyExpStatement: t.ExpressionStatement;

				if (!context.computedProps) {
					context.computedProps = new Array<string>();
				}
				context.computedProps.push(computedPropertyName);

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
						t.identifier("iconfig"),
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
						t.memberExpression(t.identifier("props"), t.identifier("t")),
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
						t.memberExpression(t.identifier("props"), t.identifier(prop)),
						t.binaryExpression(
							"+",
							t.stringLiteral(" "),
							t.memberExpression(t.identifier("props"), t.identifier(prop))
						),
						t.stringLiteral("")
					);
					ConditionalExp.extra = { parenthesized: true };

					// will parse to
					// ($configStore.getFieldValue(CAMsidebarName, t, "c") ?? "") + (c ? ' ' + c : c)
					const binaryExp = t.binaryExpression("+", logicalExp, ConditionalExp);
					// will parse to
					// cc = ($configStore.getFieldValue(CAMsidebarName, t, "c") ?? "") + (c ? ' ' + c : c)
					const assignmentExp = t.assignmentExpression(
						"=",
						t.memberExpression(t.identifier("state"), t.identifier(computedPropertyName)),
						binaryExp
					);
					// Create statement based on expression
					computedPropertyExpStatement = t.expressionStatement(assignmentExp);
				} else {
					// if prop is not a "class" property

					// get default value of prop, eg. iconDefaultValue: "i-ion:arrow-down-b"
					const defaultValue = context.defaultValues?.[prop];

					const memberExp = t.memberExpression(
						t.identifier("iconfig"),
						t.identifier("getFieldValue")
					);

					// will parse to
					// $configStore.getFieldValue(CABadgeName, t, "i")
					const callExp = t.callExpression(memberExp, [
						t.identifier(context.componentName!),
						t.memberExpression(t.identifier("props"), t.identifier("t")),
						t.stringLiteral(prop),
					]);

					let logicalExp;
					if (defaultValue) {
						// will parse to
						// i ?? $configStore.getFieldValue(CABadgeName, t, "i") ?? "i-ion:arrow-down-b"
						const defaultLogicalExp = t.logicalExpression("??", callExp, defaultValue);
						logicalExp = t.logicalExpression(
							"??",
							t.memberExpression(t.identifier("props"), t.identifier(prop)),
							defaultLogicalExp
						);
					} else {
						// will parse to
						// i ?? $configStore.getFieldValue(CABadgeName, t, "i")
						logicalExp = t.logicalExpression(
							"??",
							t.memberExpression(t.identifier("props"), t.identifier(prop)),
							callExp
						);
					}

					// will parse to
					// ci = i ?? $configStore.getFieldValue(CABadgeName, t, "i")
					const assignmentExp = t.assignmentExpression(
						"=",
						t.memberExpression(t.identifier("state"), t.identifier(computedPropertyName)),
						logicalExp
					);
					// Create statement based on expression
					computedPropertyExpStatement = t.expressionStatement(assignmentExp);
				}

				const useTaskExpStatement = t.expressionStatement(
					t.callExpression(t.identifier("useTask$"), [
						t.arrowFunctionExpression(
							[
								t.objectPattern([
									t.objectProperty(t.identifier("track"), t.identifier("track"), false, true),
								]),
							],
							t.blockStatement([
								t.expressionStatement(
									t.callExpression(t.identifier("track"), [
										t.arrowFunctionExpression(
											[],
											t.blockStatement([
												t.expressionStatement(
													t.memberExpression(t.identifier("props"), t.identifier(prop))
												),
											])
										),
									])
								),
								computedPropertyExpStatement,
							])
						),
					])
				);

				path.insertBefore(useTaskExpStatement as Node);
			}
		}
	}
}
