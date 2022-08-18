import { Config } from "./config";
import type { IUserConfig } from "./theme.type";
import { CDefaultType, CUseType, CBase } from "./theme.type";

/**
 * Config class tests
 */
describe.concurrent("Config Test", async () => {
	it("Constructor test", async () => {
		const userConfig: IUserConfig = {
			baseTheme: {
				abutton: {
					[CDefaultType]: {
						[CUseType]: CDefaultType,
						color: "text-white",
						c: "cursor-pointer",
					},
					red: {
						[CUseType]: CDefaultType,
						color: "text-red",
						c: "bg-red-500 hover:(bg-red-600 text-white)",
					},
				},
				aalert: {
					[CDefaultType]: {
						color: "text-white",
						c: "bg-red-500 hover:(bg-red-600 text-white)",
					},
				},
			},
			theme: {
				abutton: {
					[CDefaultType]: {
						[CUseType]: CDefaultType,
						color: "text-green",
						c: "bg-red-500 hover:(bg-red-600 text-white)",
					},
					blue: {
						[CUseType]: CBase + CDefaultType,
						color: "text-blue",
						c: "bg-red-500 hover:(bg-red-600 text-white)",
					},
					green: {
						[CUseType]: CDefaultType,
						c: "text-white",
					},
					yellow: {
						[CUseType]: "green",
						c: "text-white",
					},
				},
			},
		};
		const config = new Config(userConfig);
		expect(config.theme).toStrictEqual({
			abutton: {
				default: {
					color: "text-green",
					c: "cursor-pointer bg-red-500 hover:bg-red-600 hover:text-white",
				},
				red: {
					color: "text-red",
					c: "cursor-pointer bg-red-500 hover:bg-red-600 hover:text-white",
				},
				blue: {
					color: "text-blue",
					c: "cursor-pointer bg-red-500 hover:bg-red-600 hover:text-white",
				},
				green: {
					color: "text-green",
					c: "cursor-pointer bg-red-500 hover:bg-red-600 hover:text-white text-white",
				},
				yellow: {
					color: "text-green",
					c: "cursor-pointer bg-red-500 hover:bg-red-600 hover:text-white text-white text-white",
				},
			},
			aalert: {
				default: {
					color: "text-white",
					c: "bg-red-500 hover:bg-red-600 hover:text-white",
				},
			},
		});
	});
});
