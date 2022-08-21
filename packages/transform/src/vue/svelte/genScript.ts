import { extractTypesFromSource } from "../ast/ast";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";
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
	traverse(context.scriptFile, {
		enter(path) {
			// console.log(path.node);
		},
		Program(path) {
			path.unshiftContainer(
				"body",
				t.importDeclaration(
					[t.importSpecifier(t.identifier("configStore"), t.identifier("configStore"))],
					t.stringLiteral("../config")
				)
			);
		},
		ImportDeclaration(path) {
			transformImportDeclaration(path, context);
		},
		VariableDeclaration(path) {
			transformVariableDeclaration(path, context);
		},
		ExpressionStatement(path) {
			transformExpressionStatement(path, context);
		},
		CallExpression(path) {
			transformCallExpression(path, context);
		},
		MemberExpression(path) {
			transformMemberExpression(path, context);
		},
	});

	// generate code from transformed ast
	const output = generate(context.scriptAst!);

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
			path.insertBefore(disptchImport);

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
			path.insertBefore(localeImport);
		}
	}

	if (value === "@agufaui/usevue") {
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

		if (t.isIdentifier(declaration.init)) {
			const identifier = declaration.init as t.Identifier;
			switch (identifier.name) {
				case "computedProperties":
					path.remove();
					break;
			}
		}

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
							)
						);

						getTypeDef(path, iprops, context);
						path.remove();
						break;
					case "defineProps":
						const idprops = getTSDefine(callExpression);
						path.insertBefore(
							t.tsTypeAliasDeclaration(
								t.identifier("$$Props"),
								undefined,
								t.tsTypeReference(t.identifier(idprops))
							)
						);

						getTypeDef(path, idprops, context);
						path.remove();
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
							])
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

						context.defaultValues[(key as t.Identifier).name] = (value as t.StringLiteral).value;
					}
					path.remove();
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
				path.replaceWith(node.arguments[0]);

				if (!context.refs) {
					context.refs = new Array<string>();
				}
				context.refs.push(((path.parent as t.VariableDeclarator).id as t.Identifier).name);
				break;
			case "reactive":
				path.replaceWith(node.arguments[0]);

				if (!context.reactives) {
					context.reactives = new Array<string>();
				}
				context.reactives.push(((path.parent as t.VariableDeclarator).id as t.Identifier).name);
				break;
			case "emits":
				path.replaceWith(t.callExpression(t.identifier("dispatch"), node.arguments));
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

									path.replaceWith(labelStatement);
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

	if (property === "value" && context.refs?.includes(name)) {
		path.replaceWith(node.object);
	}

	if (name === "props") {
		path.replaceWith(node.property);
	}
}

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

		context.defaultValues[(key as t.Identifier).name] = (value as t.StringLiteral).value;
	}

	return iprops;
}

function getTSDefine(callExpression: t.CallExpression): string {
	const { callee, typeParameters } = callExpression;

	const iprops: string = (
		((typeParameters as t.TSTypeParameterInstantiation).params[0] as t.TSTypeReference)
			.typeName as t.Identifier
	).name;

	return iprops;
}

function getTypeDef(path: NodePath<t.VariableDeclaration>, iprops: string, context: IContext) {
	const icode = context.result?.get(iprops);
	if (icode) {
		const matchArray = icode.match(/(\w+)\??:\s*(\w+)/g);

		if (matchArray) {
			for (const match of matchArray) {
				let [prop, propType] = match.split(/\??:/);
				prop = prop.trim();
				propType = propType.trim();

				const typeProp = t.tSIndexedAccessType(
					t.tsTypeReference(t.identifier("$$Props")),
					t.tsLiteralType(t.stringLiteral(prop))
				);
				const identityProp = t.identifier(prop);
				identityProp.typeAnnotation = t.tsTypeAnnotation(typeProp);

				path.insertBefore(
					t.exportNamedDeclaration(
						t.variableDeclaration("let", [
							t.variableDeclarator(identityProp, t.identifier("undefined")),
						])
					)
				);

				if (context.noComputed?.has(prop)) continue;
				if (propType === "boolean") continue;

				if (prop.endsWith("c")) {
					const memberExp = t.memberExpression(
						t.identifier("$configStore"),
						t.identifier("getFieldValue")
					);
					const callExp = t.callExpression(memberExp, [
						t.identifier(context.componentName!),
						t.identifier("t"),
						t.stringLiteral(prop),
					]);
					const logicalExp = t.logicalExpression("??", callExp, t.stringLiteral(""));
					logicalExp.extra = { parenthesized: true };
					const ConditionalExp = t.conditionalExpression(
						t.identifier(prop),
						t.binaryExpression("+", t.stringLiteral(" "), t.identifier(prop)),
						t.stringLiteral("")
					);
					ConditionalExp.extra = { parenthesized: true };
					const binaryExp = t.binaryExpression("+", logicalExp, ConditionalExp);
					const assignmentExp = t.assignmentExpression("=", t.identifier("c" + prop), binaryExp);
					const expStatement = t.expressionStatement(assignmentExp);
					const labelStatement = t.labeledStatement(t.identifier("$"), expStatement);
					path.insertBefore(labelStatement);
				} else {
					const defaultValue = context.defaultValues?.[prop];

					const memberExp = t.memberExpression(
						t.identifier("$configStore"),
						t.identifier("getFieldValue")
					);
					const callExp = t.callExpression(memberExp, [
						t.identifier(context.componentName!),
						t.identifier("t"),
						t.stringLiteral(prop),
					]);

					let logicalExp;
					if (defaultValue) {
						const defaultLogicalExp = t.logicalExpression(
							"??",
							callExp,
							t.stringLiteral(defaultValue)
						);
						logicalExp = t.logicalExpression("??", t.identifier(prop), defaultLogicalExp);
					} else {
						logicalExp = t.logicalExpression("??", t.identifier(prop), callExp);
					}

					const assignmentExp = t.assignmentExpression("=", t.identifier("c" + prop), logicalExp);
					const expStatement = t.expressionStatement(assignmentExp);
					const labelStatement = t.labeledStatement(t.identifier("$"), expStatement);
					path.insertBefore(labelStatement);
				}
			}
		}
	}
}
