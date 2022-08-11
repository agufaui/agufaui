import { execSync } from "child_process";
import path from "path";
import consola from "consola";
import fs from "fs";

execSync("pnpm run build", { stdio: "inherit" });

const scope = "@agufaui";

const packages = ["config", "theme", "metadata", "use", "usevue", "transform", "vue", "svelte"];
//const packages = ["svelte"];

for (const name of packages) {
	let dist: string;
	if (name === "svelte") {
		dist = path.join("packages", name, "package");
	} else {
		dist = path.join("packages", name, "dist");
	}

	const packageRoot: string = path.join("packages", name);

	const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));

	const version = packageJson.version;

	let npmVersion: string;
	try {
		npmVersion = execSync(`npm view ${scope}/${name} version`).toString().trim();
	} catch (err) {
		npmVersion = "0.0.0";
	}

	if (!npmVersion || version > npmVersion) {
		let command = "pnpm publish --no-git-checks --access public";

		if (version.includes("beta")) command += " --tag beta";

		execSync(command, {
			stdio: "inherit",
			cwd: dist,
		});
		consola.success(`Published ${scope}/${name}`);
	}
}
