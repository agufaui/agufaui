import type { Program, File } from "@babel/types";
import type { ParseResult } from "@babel/parser";
import type { ITransformOptions } from "src/types";
import { StringMap } from "./ast/utils";

export enum Framework {
	Svelte,
	Qwik,
}

export interface IContext extends ITransformOptions {
	scriptContent?: string;
	scriptFile?: ParseResult<File>;
	scriptAst?: Program; // code between <script></script>
	templateAst?: IBlock; // code between <template></template>
	result?: StringMap; // eg. Map(3){'IABadgeProps' => 'interface IABadgeProps {...}', 'TLRPosition' => 'type TLRPosition = "left" | "right";', 'IAToggleEmits' => 'interface IAToggleEmits {\n    (e: "click", event: MouseEvent): void;\n}'}
	path?: string; // eg. /home/xxx/packages/vue/components/button/Abutton.vue
	hasEmits?: boolean;
	emits?: string[]; // eg. click, input
	noComputedProp?: Set<string>; // common props, eg. v, t
	noComputedFile?: Set<string>; // eg. Abutton.vue
	componentName?: string; // eg. CAButtonName
	refs?: string[]; // eg. show, open
	reactives?: string[];
	noImport?: Set<string>; // eg. vue, useVue
	defaultValues?: Record<string, any>; // eg. i: "i-icon"
	fromFileName?: string; // eg. Abutton.vue
	computedProps?: string[]; // eg. cc, ci
	notComputedProps?: string[]; // component specific props, eg. v, t
	childComponents?: string[]; // eg. Asup, Abadge
}

export interface IAttr {
	name: string;
	val: string;
	line?: number;
	column?: number;
	mustEscape?: boolean;
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

export interface ITemplateNodeTransform {
	attrs: string;
	pre: string[];
	preClose: string[];
	code: string;
}
