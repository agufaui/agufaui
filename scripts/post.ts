import { metadata } from "../packages/metadata/metadata";
import { updateSvelte } from "./utils";

async function run() {
	await Promise.all([updateSvelte(metadata)]);
}

run();
