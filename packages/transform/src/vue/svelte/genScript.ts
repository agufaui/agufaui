import type {
	Program,
	ImportDeclaration,
	VariableDeclaration,
	ImportDefaultSpecifier,
	ImportSpecifier,
	ImportNamespaceSpecifier,
	Identifier,
	StringLiteral,
	CallExpression,
	TSTypeParameterInstantiation,
	TSTypeReference,
	ObjectExpression,
	ObjectProperty,
	BooleanLiteral,
	ArrowFunctionExpression,
	TSBooleanKeyword,
	BlockStatement,
	AssignmentExpression,
	MemberExpression,
	ExpressionStatement,
	ConditionalExpression,
	Expression,
} from "@babel/types";
import { extractTypesFromSource, getUsedInterfacesFromAst } from "../ast";

export type IContext = {
	scriptContent: string;
	path: string;
	ast: Program;
};

export async function getSvelteScript(
	scriptAst: Program,
	context: Record<string, any>
): Promise<string> {
	let template = '<script lang="ts">';
	template += '\nimport { configStore } from "../config";';
	template += await genSvelteScript(scriptAst, context);
	template += "\n</script>\n";
	return template;
}

export async function genSvelteScript(
	scriptAst: Program,
	context: Record<string, any>,
	indent: string = ""
): Promise<string> {
	return await scriptAst.body.reduce(async (code, statement) => {
		let pcode = await code;
		let svelteCode: string = "";
		switch (statement.type) {
			case "ImportDeclaration":
				svelteCode = getImportDeclaration(statement as ImportDeclaration, context, indent);
				break;
			case "VariableDeclaration":
				svelteCode = await getVariableDeclaration(
					statement as VariableDeclaration,
					context,
					indent
				);
				break;
			case "ExpressionStatement":
				svelteCode = getExpressionStatement(statement as ExpressionStatement, context, indent);
				break;
			default:
				throw new Error(`Unsupported statement type: ${statement.type}`);
		}
		if (svelteCode) {
			pcode += "\n" + svelteCode + ";";
			if (context.hasEmits) {
				pcode += "\nimport { createEventDispatcher } from 'svelte';";
				delete context.hasEmits;
			}
		}
		return pcode;
	}, Promise.resolve(""));
}

export function getImportDeclaration(
	statement: ImportDeclaration,
	context: Record<string, any>,
	indent: string = ""
): string {
	if (statement.source && statement.source.extra) {
		const from = statement.source.extra.raw as string;
		if (['"vue"', '"@agufaui/usevue"', '"@agufaui/config"'].includes(from)) {
			return "";
		}
	}

	let svelteImport = "import";
	let iname = "";

	if (statement.importKind === "type") {
		svelteImport += " type";
	}

	for (let i = 0; i < statement.specifiers.length; i++) {
		if (i > 0) {
			svelteImport += ", ";
		}

		const specifier = statement.specifiers[i];

		switch (specifier.type) {
			case "ImportDefaultSpecifier":
				const defaultSpecifier = specifier as ImportDefaultSpecifier;
				svelteImport += ` ${defaultSpecifier.local.name}`;
				break;
			case "ImportSpecifier":
				if (i === 0) {
					svelteImport += " { ";
				}
				const importSpecifier = specifier as ImportSpecifier;
				switch (importSpecifier.imported.type) {
					case "Identifier":
						const identifier = importSpecifier.imported as Identifier;
						svelteImport += `${identifier.name}`;
						iname = identifier.name;
						if (iname.endsWith("Emits")) {
							context.hasEmits = true;
						}
						if (specifier.local && specifier.local.name !== identifier.name) {
							svelteImport += " as " + specifier.local.name;
						}
						break;
					case "StringLiteral":
						const literal = importSpecifier.imported as StringLiteral;
						svelteImport += literal.value;
						break;
					default:
						throw new Error("Unsupported import specifier type: " + importSpecifier.imported);
				}
				if (i === statement.specifiers.length - 1) {
					svelteImport += " }";
				}
				break;
			case "ImportNamespaceSpecifier":
				const namespaceSpecifier = specifier as ImportNamespaceSpecifier;
				svelteImport += ` * as ${namespaceSpecifier.local.name}`;
				break;
			default:
				throw new Error(`Unsupported import specifier type: ${specifier}`);
		}
	}

	if (statement.source && statement.source.extra) {
		let from = statement.source.extra.raw as string;

		if (from.includes(".vue")) {
			from = from.replace(".vue", ".svelte");
		}

		svelteImport += " from " + from;

		if (from === '"@agufaui/theme"' && iname.startsWith("C") && iname.endsWith("Name")) {
			context.componentName = iname;
		}
	}

	return svelteImport;
}

export async function getVariableDeclaration(
	statement: VariableDeclaration,
	context: Record<string, any>,
	indent: string = ""
): Promise<string> {
	let svelteVar = "";
	svelteVar += statement.kind;

	for (let i = 0; i < statement.declarations.length; i++) {
		if (i > 0) {
			svelteVar += ", ";
		}
		const declaration = statement.declarations[i];

		switch (declaration.id.type) {
			case "Identifier":
				const identifier = declaration.id as Identifier;
				svelteVar += ` ${declaration.id.name}`;
				break;
			case "ObjectPattern":
				break;
			default:
				throw new Error("Unsupported variable declaration type: " + declaration.id.type);
		}

		if (declaration.init) {
			switch (declaration.init.type) {
				case "CallExpression":
					const callExpression = declaration.init as CallExpression;

					switch (callExpression.callee.type) {
						case "Identifier":
							const identifier = callExpression.callee as Identifier;
							switch (identifier.name) {
								case "withDefaults":
									const [iprops, dprops] = getWithDefaults(callExpression);
									svelteVar = `type $$Props = ${iprops};`;
									svelteVar += await getTypeDef(iprops, dprops, context);
									break;
								case "defineProps":
									const idprops = getTSDefine(callExpression);
									svelteVar = `type $$Props = ${idprops};`;
									svelteVar += await getTypeDef(idprops, {}, context);
									break;
								case "defineEmits":
									const iemits = getTSDefine(callExpression);
									svelteVar = `type $$Events = ${iemits};`;
									svelteVar += "\nconst dispatch = createEventDispatcher()";
									break;
								case "inject":
								case "useVue":
								case "getComputedFromProps":
									svelteVar = "";
									break;
								case "ref":
									svelteVar +=
										" = " + getCallExpression(declaration.init as CallExpression, context, indent);
									svelteVar = svelteVar.replace(/ref\(|\)/g, "");
									if (!context.refs) {
										context.refs = new Array<string>();
									}
									context.refs.push((declaration.id as Identifier).name);
									break;
								default:
									svelteVar +=
										" = " + getCallExpression(declaration.init as CallExpression, context, indent);
							}
							break;
						default:
							svelteVar +=
								" = " + getCallExpression(declaration.init as CallExpression, context, indent);
					}

					break;
				case "Identifier":
					const identifier = declaration.init as Identifier;
					switch (identifier.name) {
						case "computedProperties":
							svelteVar = "";
							break;
						default:
							svelteVar += " = " + identifier.name;
					}
					break;
				case "ArrowFunctionExpression":
					svelteVar +=
						" = " +
						getArrowFunctionExpression(
							declaration.init as ArrowFunctionExpression,
							context,
							indent
						);
					break;
				case "BooleanLiteral":
					const booleanLiteral = declaration.init as BooleanLiteral;
					svelteVar += " = " + booleanLiteral.value;
					break;
				default:
					throw new Error("Unsupported variable declaration init type: " + declaration.init.type);
			}
		}
	}

	return svelteVar;
}

function getExpressionStatement(
	expressionStatement: ExpressionStatement,
	context: Record<string, any>,
	indent: string = ""
): string {
	let svelteVar = "";

	switch (expressionStatement.expression.type) {
		case "CallExpression":
			const callExpression = expressionStatement.expression as CallExpression;
			switch (callExpression.callee.type) {
				case "Identifier":
					const identifier = callExpression.callee as Identifier;
					switch (identifier.name) {
						case "watch":
							svelteVar += "$: ";

							const arrowFunc = callExpression.arguments[1] as ArrowFunctionExpression;
							svelteVar +=
								"{" + getBlockStatement(arrowFunc.body as BlockStatement, context, indent) + "\n}";
							break;
						default:
							svelteVar +=
								indent +
								getCallExpression(
									expressionStatement.expression as CallExpression,
									context,
									indent
								);
					}
					break;
				default:
					svelteVar +=
						indent +
						getCallExpression(expressionStatement.expression as CallExpression, context, indent);
			}
			break;
		case "AssignmentExpression":
			svelteVar +=
				indent +
				getAssignmentExpression(
					expressionStatement.expression as AssignmentExpression,
					context,
					indent
				);
			break;
		default:
			throw new Error("Unknown expression type: " + expressionStatement.expression.type);
	}
	return svelteVar;
}

function getWithDefaults(
	callExpression: CallExpression
): [string, Record<string, string | boolean>] {
	const args = callExpression.arguments;
	if (args.length !== 2) {
		throw new Error("withDefaults takes exactly 2 arguments");
	}
	const [defineProps, defaultValues] = args as [CallExpression, ObjectExpression];
	const { callee, typeParameters } = defineProps;

	if ((callee as Identifier).name !== "defineProps") {
		throw new Error(
			"withDefaults first argument must be CallExpression with Identifier callee named defineProps"
		);
	}

	const iprops: string = (
		((typeParameters as TSTypeParameterInstantiation).params[0] as TSTypeReference)
			.typeName as Identifier
	).name;

	const dprops: Record<string, string | boolean> = {};
	for (const prop of (defaultValues as ObjectExpression).properties as ObjectProperty[]) {
		const { key, value } = prop;
		if (key.type !== "Identifier") {
			throw new Error("withDefaults second argument must be ObjectExpression with Identifier keys");
		}

		if (value.type === "StringLiteral") {
			dprops[(key as Identifier).name] = (value as StringLiteral).value;
		} else if (value.type === "BooleanLiteral") {
			dprops[(key as Identifier).name] = (value as BooleanLiteral).value;
		}
	}

	return [iprops, dprops];
}

function getTSDefine(callExpression: CallExpression): string {
	const { callee, typeParameters } = callExpression;

	const iprops: string = (
		((typeParameters as TSTypeParameterInstantiation).params[0] as TSTypeReference)
			.typeName as Identifier
	).name;

	return iprops;
}

async function getTypeDef(
	iprops: string,
	dprops: Record<string, string | boolean>,
	context: Record<string, any>
): Promise<string> {
	let scode = "";
	const { result } = await extractTypesFromSource(context.scriptContent, [iprops], {
		relativePath: context.path,
		ast: context.ast,
		isInternal: true,
	});

	if (!result.size) {
		throw new Error("No interfaces found: " + iprops);
	}

	const icode = result.get(iprops);
	if (icode) {
		const matchArray = icode.match(/(\w+)\??:\s*(\w+)/g);

		if (matchArray) {
			for (const match of matchArray) {
				let [prop, propType] = match.split(/\??:/);
				prop = prop.trim();
				propType = propType.trim();

				scode += `\nexport let ${prop}: $$Props["${prop}"] = ${
					typeof dprops[prop] === "string" ? `"${dprops[prop]}";` : `${dprops[prop]};`
				}`;

				if (["atype", "text", "msg"].includes(prop)) continue;
				if (propType === "boolean") continue;

				if (prop.endsWith("class")) {
					scode += `\n$: c${prop} = ($configStore.getFieldValue(${context.componentName}, atype, "${prop}") ?? "") + (${prop} ? " " + ${prop} : "");`;
				} else {
					scode += `\n$: c${prop} = ${prop} ?? $configStore.getFieldValue(${context.componentName}, atype, "${prop}");`;
				}
			}
		}

		scode = scode.slice(0, -1);
	}

	return scode;
}

function getCallExpression(
	callExpression: CallExpression,
	context: Record<string, any>,
	indent: string = ""
): string {
	let callCode = "";

	switch (callExpression.callee.type) {
		case "Identifier":
			const identifier = callExpression.callee as Identifier;
			callCode += indent + identifier.name;

			if (callExpression.typeParameters) {
				const typeParameters = callExpression.typeParameters as TSTypeParameterInstantiation;

				for (let j = 0; j < typeParameters.params.length; j++) {
					if (j > 0) {
						callCode += ", ";
					}
					const typeParameter = typeParameters.params[j];
					// console.log(typeParameter);
					switch (typeParameter.type) {
						case "TSTypeReference":
							const typeReference = typeParameter as TSTypeReference;

							switch (typeReference.typeName.type) {
								case "Identifier":
									const identifier = typeReference.typeName as Identifier;
									callCode += `<${identifier.name}>`;
									break;
								default:
									throw new Error(
										"Unsupported type reference type: " + typeReference.typeName.type
									);
							}

							break;
						default:
							throw new Error("Unsupported type parameters type: " + typeParameter.type);
					}
				}
			}

			if (callExpression.arguments.length > 0) {
				callCode += "(";
				for (let j = 0; j < callExpression.arguments.length; j++) {
					if (j > 0) {
						callCode += ", ";
					}

					const callExpressionArgument = callExpression.arguments[j];

					switch (callExpressionArgument.type) {
						case "CallExpression":
							callCode += getCallExpression(
								callExpressionArgument as CallExpression,
								context,
								indent
							);

							break;
						case "ObjectExpression":
							const objectExpression = callExpressionArgument as ObjectExpression;
							callCode += "{";
							for (const prop of objectExpression.properties) {
								switch (prop.type) {
									case "ObjectProperty":
										const objectProperty = prop as ObjectProperty;

										switch (objectProperty.key.type) {
											case "Identifier":
												callCode += `${objectProperty.key.name}: `;
												break;
											default:
												throw new Error(
													"Unsupported object property key type: " + objectProperty.key.type
												);
										}

										switch (objectProperty.value.type) {
											case "CallExpression":
												callCode += getCallExpression(
													objectProperty.value as CallExpression,
													context,
													indent
												);
												break;
											case "Identifier":
												const identifier = objectProperty.value as Identifier;
												callCode += identifier.name;
												break;
											case "StringLiteral":
												const stringLiteral = objectProperty.value as StringLiteral;
												callCode += `"${stringLiteral.value}",`;
												break;
											case "BooleanLiteral":
												const booleanLiteral = objectProperty.value as BooleanLiteral;
												callCode += booleanLiteral.value;
												break;
											default:
												throw new Error(
													"Unsupported object property value type: " + objectProperty.value.type
												);
										}
										break;
									default:
										throw new Error("Unsupported object property type: " + prop.type);
								}
							}
							callCode += "}";
							break;
						case "Identifier":
							const identifier = callExpressionArgument as Identifier;
							callCode += identifier.name;
							break;
						case "StringLiteral":
							const stringLiteral = callExpressionArgument as StringLiteral;
							callCode += `"${stringLiteral.value}"`;
							break;
						case "BooleanLiteral":
							const booleanLiteral = callExpressionArgument as BooleanLiteral;
							callCode += booleanLiteral.value;
							break;
						case "ArrowFunctionExpression":
							callCode += getArrowFunctionExpression(
								callExpressionArgument as ArrowFunctionExpression,
								context,
								indent
							);
							break;
						default:
							throw new Error(
								"Unsupported call expression argument type: " + callExpressionArgument.type
							);
					}
				}
				callCode += ")";
			} else {
				callCode += "()";
			}

			break;
		default:
			throw new Error("Unsupported call expression type: " + callExpression.callee.type);
	}

	return callCode;
}

function getAssignmentExpression(
	exp: AssignmentExpression,
	context: Record<string, any>,
	indent: string = ""
): string {
	let callCode = "";

	switch (exp.left.type) {
		case "MemberExpression":
			callCode += getMemberExpression(exp.left as MemberExpression, context, indent);
			break;
		default:
			throw new Error("Unsupported assignment expression left type: " + exp.left.type);
	}

	callCode += ` ${exp.operator} `;

	switch (exp.right.type) {
		case "BooleanLiteral":
			const booleanLiteral = exp.right as BooleanLiteral;
			callCode += booleanLiteral.value;
			break;
		case "ConditionalExpression":
			callCode += getConditionalExpression(exp.right as ConditionalExpression, context, indent);
			break;
		default:
			throw new Error("Unsupported assignment expression right type: " + exp.right.type);
	}

	return callCode;
}

function getArrowFunctionExpression(
	exp: ArrowFunctionExpression,
	context: Record<string, any>,
	indent: string = ""
): string {
	let callCode = "";
	callCode += "(";
	// parameters
	for (let j = 0; j < exp.params.length; j++) {
		if (j > 0) {
			callCode += ", ";
		}

		const param = exp.params[j];
		if (param.type === "Identifier") {
			callCode += param.name;
		}

		if (param.typeAnnotation) {
			if (param.typeAnnotation.type === "TSTypeAnnotation") {
				// console.log(param.typeAnnotation.typeAnnotation);
				if (param.typeAnnotation.typeAnnotation.type === "TSTypeReference") {
					callCode +=
						": " +
						((param.typeAnnotation.typeAnnotation as TSTypeReference).typeName as Identifier).name;
				} else if (param.typeAnnotation.typeAnnotation.type === "TSBooleanKeyword") {
					callCode += ": boolean";
				}
			}
		}
	}

	callCode += ") => ";
	// body
	// console.log("body", arrowFunctionExpression.body);
	if (exp.body) {
		switch (exp.body.type) {
			case "BlockStatement":
				callCode +=
					"{" + getBlockStatement(exp.body as BlockStatement, context, indent + "\t") + "\n}";
				break;
			case "MemberExpression":
				callCode += getMemberExpression(exp.body as MemberExpression, context, indent);
				break;
			default:
				throw new Error("Unsupported arrow function body type: " + exp.body.type);
		}
	}

	return callCode;
}

function getConditionalExpression(
	exp: ConditionalExpression,
	context: Record<string, any>,
	indent: string = ""
): string {
	let callCode = "";
	callCode += getExpression(exp.test, context, indent) + " ? ";
	callCode += getExpression(exp.consequent, context, indent) + " : ";
	callCode += getExpression(exp.alternate, context, indent);
	return callCode;
}

function getExpression(exp: Expression, context: Record<string, any>, indent: string = ""): string {
	let callCode = "";
	switch (exp.type) {
		case "Identifier":
			const identifier = exp as Identifier;
			callCode += identifier.name;
			break;
		case "BooleanLiteral":
			const booleanLiteral = exp as BooleanLiteral;
			callCode += booleanLiteral.value;
			break;
		default:
			throw new Error("Unsupported expression type: " + exp.type);
	}
	return callCode;
}

function getBlockStatement(
	exp: BlockStatement,
	context: Record<string, any>,
	indent: string = ""
): string {
	let callCode = "";

	for (let j = 0; j < exp.body.length; j++) {
		const statement = exp.body[j];

		switch (statement.type) {
			case "ExpressionStatement":
				callCode +=
					"\n" +
					indent +
					getExpressionStatement(statement as ExpressionStatement, context, "") +
					";";
				callCode = callCode.replace("emits", "dispatch");
				break;
			default:
				throw new Error("Unsupported statement type: " + statement.type);
		}
	}

	return callCode;
}

function getMemberExpression(
	exp: MemberExpression,
	context: Record<string, any>,
	indent: string = ""
): string {
	let callCode = "";

	switch (exp.object.type) {
		case "Identifier":
			const identifier = exp.object as Identifier;
			callCode += indent + identifier.name;
			break;
		default:
			throw new Error("Unsupported member expression object type: " + exp.object.type);
	}

	switch (exp.property.type) {
		case "Identifier":
			const identifier = exp.property as Identifier;
			if (identifier.name !== "value" || !context.refs.includes(exp.object.name)) {
				callCode += `.${identifier.name}`;
			}
			break;
		default:
			throw new Error("Unsupported member expression property type: " + exp.property.type);
	}
	return callCode;
}
