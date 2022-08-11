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

	it("2 layer variant group test", async () => {
		const input =
			"bg-red-400 sm:(hover:(bg-red-500 text-white border-2) focus:(bg-blue-500 text-red)) text-sm";
		const str = expandVariantGroup(input);
		expect(str).toBe(
			"bg-red-400 sm:hover:bg-red-500 sm:hover:text-white sm:hover:border-2 sm:focus:bg-blue-500 sm:focus:text-red text-sm"
		);
	});
});
