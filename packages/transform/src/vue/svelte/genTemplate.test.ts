import type { IBlock } from "../types";
import { genSvelteTemplate } from "./genTemplate";
import pugLex from "pug-lexer";
import pugParse from "pug-parser";

describe.concurrent("Generate Svelet code from Vue code Test", async () => {
	it("v-bind test", async () => {
		const vueTemplate =
			'button(:type="ctype" :class="[test, try]" v-bind="$attrs")\n\tspan(v-bind="blockObject")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n<button type="{ctype}" class="{test} {try}" {...$$restProps}>\n\t<span {...blockObject}>\n\t</span>\n</button>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-for test", async () => {
		const vueTemplate =
			'button(v-for="str in strs" :key="str")\n\tspan(v-for="(str, i) in strs" :key="str+i")\n\t\tspan(v-for="({intro, test}, i) in strs" :key="intro+i")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			"\n{#each strs as str (str)}" +
			"\n\t<button>" +
			"\n\t\t{#each strs as str, i (str+i)}" +
			"\n\t\t\t<span>" +
			"\n\t\t\t\t{#each strs as {intro, test}, i (intro+i)}" +
			"\n\t\t\t\t\t<span>" +
			"\n\t\t\t\t\t</span>" +
			"\n\t\t\t\t{/each}" +
			"\n\t\t\t</span>" +
			"\n\t\t{/each}" +
			"\n\t</button>" +
			"\n{/each}";
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-if test", async () => {
		const vueTemplate = 'button(v-if="type")\nspan(v-else-if="another")\nspan(v-else)';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			"\n{#if type}" +
			"\n\t<button>" +
			"\n\t</button>" +
			"\n{:else if another}" +
			"\n\t<span>" +
			"\n\t</span>" +
			"\n{:else}" +
			"\n\t<span>" +
			"\n\t</span>" +
			"\n{/if}";
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-model test", async () => {
		const vueTemplate = 'button(v-model="value")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = '\n<button bind:v="{value}">\n</button>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-model: test", async () => {
		const vueTemplate = 'button(v-model:model="value")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = '\n<button bind:model="{value}">\n</button>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-on test", async () => {
		const vueTemplate = 'button(@click.stop.prevent.once.capture.self.passive="value(false)")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n<button on:click|stopPropagation|preventDefault|once|capture|self|passive="{() => value(false)}">\n</button>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-show test", async () => {
		const vueTemplate = 'button(v-show="type")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = '\n<button class:hidden="{!type}">\n</button>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-slot test", async () => {
		const vueTemplate = "template(#default)";
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = '\n<template slot="default">\n</template>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-once test", async () => {
		const vueTemplate = "template(v-once)";
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = "\n<template once>\n</template>";
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-bind test", async () => {
		const vueTemplate = 'span {{open? tr("amobile", "Open) : tr("amobile", "Close")}}';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n<span> {open? $tr("amobile", "Open) : $tr("amobile", "Close")}\n</span>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});
});
