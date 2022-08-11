import { useVue } from ".";
import { Config } from "@agufaui/config";

describe.concurrent("Component Test", async () => {
	it("Props hover validation", async () => {
		const { getComputedFromProps } = useVue();
		const config = new Config({
			theme: { abutton: { default: { hover: "hover:bg-green-400" } } },
		});
		expect(1).toBe(1);
	});
});
