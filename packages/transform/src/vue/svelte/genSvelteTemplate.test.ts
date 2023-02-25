import type { IBlock } from "../types";
import { genSvelteTemplate } from "./genSvelteTemplate";
import pugLex from "pug-lexer";
import pugParse from "pug-parser";

describe.concurrent("Generate Svelet code from Vue code Test", async () => {
	it("v-bind test", async () => {
		const vueTemplate =
			'button(:type="ctype" :class="[test, try]" v-bind="$attrs")\n\tspan(v-bind="blockObject")\n\tspan(v-bind="{...item, ...$attrs}")\n\tspan(v-bind="link.attrs")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n<button type="{ctype}" class="{test} {try}" {...$$restProps}>\n\t<span {...blockObject}>\n\t</span>\n\t<span {...item} {...$$restProps}>\n\t</span>\n\t<span {...link.attrs}>\n\t</span>\n</button>';
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
		const vueTemplate =
			'button(@click.stop.prevent.once.capture.self.passive="value(false)" @close="show=true" @input="input($event)" @change="change" @blur="if (open) open = !open;")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n<button on:click|stopPropagation|preventDefault|once|capture|self|passive="{() => value(false)}" on:close="{() => show=true}" on:input="{(e) => input(e)}" on:change="{change}" on:blur="{() => {if (open) open = !open;}}">\n</button>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("v-show test", async () => {
		const vueTemplate = 'button(v-show="type")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = '\n<button class:hidden="{!(type)}">\n</button>';
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

	it("tr test", async () => {
		const vueTemplate = 'span {{open? tr("amtoggle", "Open) : tr("amtoggle", "Close")}}';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n<span> {open? $tr("amtoggle", "Open) : $tr("amtoggle", "Close")}\n</span>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("dynamic component test", async () => {
		const vueTemplate = 'component(:is="test")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = '\n<svelte:component this="{test}">\n</svelte:component>';
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("async dynamic component test", async () => {
		const vueTemplate = 'component(:is="getComponent(v.name)")';
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate =
			'\n{#await getComponent(v.name) then c}\n\t<svelte:component this="{c}">\n\t</svelte:component>\n{/await}';
		const genTemplate = genSvelteTemplate(ast);
		console.log(genTemplate);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("classnames Curly brackets {} test", async () => {
		const vueTemplate = "button(:class=\"{'text-lg': open}\")";
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = "\n<button class=\"{open? 'text-lg' : ''}\">\n</button>";
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});

	it("classnames Curly Brackets {} in Square Brackets [] test", async () => {
		const vueTemplate = "button(:class=\"[{'text-lg': open}]\")";
		const ast = pugParse(pugLex(vueTemplate)) as IBlock;
		const svelteTemplate = "\n<button class=\"{open? 'text-lg' : ''}\">\n</button>";
		const genTemplate = genSvelteTemplate(ast);
		expect(genTemplate).toBe(svelteTemplate);
	});
});
