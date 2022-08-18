module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"@vue/eslint-config-typescript",
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"@typescript-eslint/no-unused-vars": "off",
		"vue/require-explicit-emits": "off",
		"vue/multi-word-component-names": "off",
	},
};
