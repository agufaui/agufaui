import fs from "fs-extra";
import { metadata } from "../packages/metadata/metadata";
import { updateImport, updateCountBadge, updateIndexREADME, updatePackageREADME } from "./utils";

async function run() {
	await Promise.all([
		updateImport(metadata),
		updatePackageREADME(metadata),
		updateIndexREADME(metadata),
		updateCountBadge(metadata),
	]);

	await fs.copy("./CONTRIBUTING.md", "./packages/contributing.md");
}

run();
