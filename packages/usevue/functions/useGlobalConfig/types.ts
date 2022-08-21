import type { IConfig } from "@agufaui/config";

/**
 * @summary Use Global Configuration Object
 */
export interface IUseGlobalConfig {
	/**
	 * Get global configuration
	 * @returns Global Configuration Object
	 */
	getConfig: () => IConfig | undefined;
}
