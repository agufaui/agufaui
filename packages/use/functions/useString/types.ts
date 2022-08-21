/**
 * @summary Shared string utilities for Vue components
 */
export interface IUseString {
	/**
	 * Convert string to Pascal Case then split into words and separate by space
	 * @example pascalCaseToSpace("useIDLogin") // "User ID Login"
	 * @param word String to convert
	 * @returns String of words separated by space
	 */
	pascalCaseToSpace: (word: string) => string;

	/**
	 * Convert first letter of a string to upper case
	 * @example firstLetterToUpper("helloWorld") // "HelloWorld"
	 * @param s String to convert
	 * @returns First Letter of String converted to Upper Case
	 */
	firstLetterToUpper: (s: string) => string;
	camelCaseToSpace: (word: string) => string;
	camelCaseToPascalCase: (word: string) => string;
	camelCaseToHyphen: (word: string) => string;
	hyphenToCamelCase: (word: string) => string;
}
