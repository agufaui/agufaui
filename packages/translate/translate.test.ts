import { translate } from "./translate";

/**
 * Config class tests
 */
describe.concurrent("Config Test", async () => {
	it("Constructor test", async () => {
		const opts = {
			from: "en",
			to: "zh-cn",
		};
		const result = await translate("Hello", opts);
		expect(result).toBe("你好");
	});
});
