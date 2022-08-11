import { matchedRules, getClassMatch } from "./unionCSS";
import { TMatchedRules } from "./config.type";
/**
 * matchedRules function tests
 */
describe.concurrent("Matched Rules Test", async () => {
	it("Matched Rules test", async () => {
		const input = "bg-red-400 hover:text-white";
		const matched: TMatchedRules[] = matchedRules(input);
	});
});

/**
 * getClassMatch function tests
 */
describe.concurrent("Get Class Match Test", async () => {
	it("Utility test", async () => {
		const input = "bg-red-400";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(false);
		expect(result.raw).toBe("bg-red-400");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("bg-red-400");
		expect(result.variant).toBe("");
	});

	it("Variant Utility test", async () => {
		const input = "hover:bg-red-400";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(false);
		expect(result.raw).toBe("hover:bg-red-400");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("bg-red-400");
		expect(result.variant).toBe("hover:");
	});

	it("Nested Variant Utility test", async () => {
		const input = "sm:hover:bg-red-400";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(false);
		expect(result.raw).toBe("sm:hover:bg-red-400");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("bg-red-400");
		expect(result.variant).toBe("sm:hover:");
	});

	it("Icon test", async () => {
		const input = "i-icon-loading";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(true);
		expect(result.raw).toBe("i-icon-loading");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("i-icon-loading");
		expect(result.variant).toBe("");
	});

	it("Icon with Variant Separator test", async () => {
		const input = "i-icon:top-loading";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(true);
		expect(result.raw).toBe("i-icon:top-loading");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("i-icon:top-loading");
		expect(result.variant).toBe("");
	});

	it("Icon with Variant Separator with Variant test", async () => {
		const input = "sm:hover:i-icon:top-loading";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(true);
		expect(result.raw).toBe("sm:hover:i-icon:top-loading");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("i-icon:top-loading");
		expect(result.variant).toBe("sm:hover:");
	});

	it("Icon with Multiple Variant Separator with Variant test", async () => {
		const input = "sm:hover:i-icon:top-2:test-loading:circle";
		const result = getClassMatch(input, ":");
		expect(result.isIcon).toBe(true);
		expect(result.raw).toBe("sm:hover:i-icon:top-2:test-loading:circle");
		expect(result.rules).toStrictEqual([]);
		expect(result.util).toBe("i-icon:top-2:test-loading:circle");
		expect(result.variant).toBe("sm:hover:");
	});
});
