import { expandVariantGroup } from "./variantGroup";

describe.concurrent("Variant Group Test", async () => {
	it("1 layer variant group test", async () => {
		const input =
			"bg-red-400 hover:(bg-red-500 text-white border-2) focus:(bg-blue-500 text-red) text-sm";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"bg-red-400 hover:bg-red-500 hover:text-white hover:border-2 focus:bg-blue-500 focus:text-red text-sm"
		);
	});

	it("1 layer variant group chaining test", async () => {
		const input = "bg-red-400 sm:hover:(bg-red-500 text-white border-2) text-sm";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"bg-red-400 sm:hover:bg-red-500 sm:hover:text-white sm:hover:border-2 text-sm"
		);
	});

	it("2 layer variant group test", async () => {
		const input =
			"bg-red-400 sm:(hover:(bg-red-500 text-white border-2) focus:(bg-blue-500 text-red)) text-sm";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"bg-red-400 sm:hover:bg-red-500 sm:hover:text-white sm:hover:border-2 sm:focus:bg-blue-500 sm:focus:text-red text-sm"
		);
	});

	it(":not selector test", async () => {
		const input = "[&:not(peer-placeholder-shown)]:(scale-90 -translate-y-3 text-sm)";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"[&:not(peer-placeholder-shown)]:scale-90 [&:not(peer-placeholder-shown)]:-translate-y-3 [&:not(peer-placeholder-shown)]:text-sm"
		);
	});

	it(":not selector chaining test", async () => {
		const input = "[&:not(peer-placeholder-shown)]:dark:(scale-90 -translate-y-3 text-sm)";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"[&:not(peer-placeholder-shown)]:dark:scale-90 [&:not(peer-placeholder-shown)]:dark:-translate-y-3 [&:not(peer-placeholder-shown)]:dark:text-sm"
		);
	});

	it(":not selector chaining test", async () => {
		const input = "dark:[&:not(peer-placeholder-shown)]:(scale-90 -translate-y-3 text-sm)";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"dark:[&:not(peer-placeholder-shown)]:scale-90 dark:[&:not(peer-placeholder-shown)]:-translate-y-3 dark:[&:not(peer-placeholder-shown)]:text-sm"
		);
	});
});
