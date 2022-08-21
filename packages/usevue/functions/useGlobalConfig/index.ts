import type { IUseGlobalConfig } from "./types";
import { inject } from "vue";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";

export function useGlobalConfig(): IUseGlobalConfig {
	function getConfig(): IConfig | undefined {
		return inject<IConfig>(CConfigProvideName);
	}

	return { getConfig };
}

export * from "./types";
