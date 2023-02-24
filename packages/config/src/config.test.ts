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
						c: "bg-red-5 hover:(bg-red-6 text-white)",
					},
				},
				aalert: {
					[CDefaultType]: {
						color: "text-white",
						c: "bg-red-5 hover:(bg-red-6 text-white)",
					},
				},
				replacedelete: {
					[CDefaultType]: {
						color: "text-white",
						c: "cursor-pointer bg-red-5 bg-repeat-round hover:(bg-red-6 text-white)",
					},
					replaceline: {
						[CUseType]: CDefaultType,
						color: "text-red",
						c: "rf@ bg-red-5 hover:(bg-red-6 text-white)",
					},
					deleteline: {
						[CUseType]: CDefaultType,
						color: "text-red",
						c: "df@",
					},
					replace: {
						[CUseType]: CDefaultType,
						c: "r@ bg-red-3",
					},
					delete: {
						[CUseType]: CDefaultType,
						c: "d@hover:bg-red-6 hover:bg-blue-6",
					},
				},
			},
			theme: {
				abutton: {
					[CDefaultType]: {
						[CUseType]: CDefaultType,
						color: "text-green",
						c: "bg-red-5 hover:(bg-red-6 text-white)",
					},
					blue: {
						[CUseType]: CBase + CDefaultType,
						color: "text-blue",
						c: "bg-red-5 hover:(bg-red-6 text-white)",
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
				replacedelete: {
					[CDefaultType]: {
						[CUseType]: CDefaultType,
						vc: "text-blue-1 bg-red-5",
					},
					replacelineUser: {
						[CUseType]: CDefaultType,
						vc: "rf@ text-red-3",
					},
					deletelineUser: {
						[CUseType]: CDefaultType,
						vc: "df@",
					},
					replaceUser: {
						[CUseType]: CDefaultType,
						c: "r@ bg-red-3",
					},
					deleteUser: {
						[CUseType]: CDefaultType,
						c: "d@hover:bg-red-6 hover:bg-blue-6",
					},
				},
			},
		};
		const config = new Config(userConfig);
		expect(config.theme).toStrictEqual({
			abutton: {
				default: {
					color: "text-green",
					c: "cursor-pointer bg-red-5 hover:bg-red-6 hover:text-white",
				},
				red: {
					color: "text-red",
					c: "cursor-pointer bg-red-5 hover:bg-red-6 hover:text-white",
				},
				blue: {
					color: "text-blue",
					c: "cursor-pointer bg-red-5 hover:bg-red-6 hover:text-white",
				},
				green: {
					color: "text-green",
					c: "cursor-pointer bg-red-5 hover:bg-red-6 hover:text-white text-white",
				},
				yellow: {
					color: "text-green",
					c: "cursor-pointer bg-red-5 hover:bg-red-6 hover:text-white text-white text-white",
				},
			},
			aalert: {
				default: {
					color: "text-white",
					c: "bg-red-5 hover:bg-red-6 hover:text-white",
				},
			},
			replacedelete: {
				default: {
					color: "text-white",
					c: "cursor-pointer bg-red-5 bg-repeat-round hover:bg-red-6 hover:text-white",
					vc: "text-blue-1 bg-red-5",
				},
				replaceline: {
					color: "text-red",
					c: "bg-red-5 hover:bg-red-6 hover:text-white",
				},
				deleteline: {
					color: "text-red",
				},
				replacelineUser: {
					color: "text-white",
					c: "cursor-pointer bg-red-5 bg-repeat-round hover:bg-red-6 hover:text-white",
					vc: "text-red-3",
				},
				deletelineUser: {
					color: "text-white",
					c: "cursor-pointer bg-red-5 bg-repeat-round hover:bg-red-6 hover:text-white",
				},
				replace: {
					color: "text-white",
					c: "cursor-pointer hover:bg-red-6 hover:text-white bg-red-3",
				},
				delete: {
					color: "text-white",
					c: "cursor-pointer bg-red-5 bg-repeat-round hover:text-white hover:bg-blue-6",
				},
				replaceUser: {
					color: "text-white",
					c: "cursor-pointer hover:bg-red-6 hover:text-white bg-red-3",
					vc: "text-blue-1 bg-red-5",
				},
				deleteUser: {
					color: "text-white",
					c: "cursor-pointer bg-red-5 bg-repeat-round hover:text-white hover:bg-blue-6",
					vc: "text-blue-1 bg-red-5",
				},
			},
		});
	});
});
