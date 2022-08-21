import type { ITranslateOptions } from "../translate.types";
import type { Response } from "node-fetch";

export interface IEngine {
	needkey: boolean;

	fetch: (opts: ITranslateOptions) => string[];
	parse: (response: Response) => Promise<string>;
}
