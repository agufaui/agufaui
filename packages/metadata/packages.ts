import type { PackageManifest } from "./types";

export const packages: PackageManifest[] = [
	{
		name: "metadata",
		display: "Metadata for AgufaUI",
		manualImport: true,
		iife: false,
		utils: true,
		target: "node16",
	},
	{
		name: "core",
		display: "AgufaUIDocs",
		description: "AgufaUI Documents and Types",
	},
	{
		name: "use",
		display: "Use",
		description: "Functions (composables) for AgufaUI Components",
		path: "use/functions",
	},
];
