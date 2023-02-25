import { translate } from "./translate";

/**
 * Config class tests
 */
describe.concurrent("Translate Test", async () => {
	it("translate test", async () => {
		const opts = {
			from: "en",
			to: "zh-cn",
		};
		const result = await translate("Hello", opts);
		expect(result).toBe("你好");
	});
});
