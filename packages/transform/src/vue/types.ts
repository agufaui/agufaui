import type { Program, File } from "@babel/types";
import type { ParseResult } from "@babel/parser";
import type { ITransformOptions } from "src/types";
import { StringMap } from "./ast/utils";

export interface IContext extends ITransformOptions {
	scriptContent?: string;
	path?: string;
	scriptFile?: ParseResult<File>;
	scriptAst?: Program;
	hasEmits?: boolean;
	emits?: string[];
	noComputed?: Set<string>;
	componentName?: string;
	refs?: string[];
	reactives?: string[];
	templateAst?: IBlock;
	noImport?: Set<string>;
	result?: StringMap;
	defaultValues?: Record<string, any>;
}

export interface IAttr {
	name: string;
	val: string;
	line: number;
	column: number;
	mustEscape: boolean;
}
export interface ITag {
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

export interface IText {
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
