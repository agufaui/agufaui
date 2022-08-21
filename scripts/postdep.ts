import { execSync } from "child_process";
import path from "path";
import consola from "consola";
import fs from "fs";

const workspaces = ["packages", "playground"];
for (const workspace of workspaces) {
	const dirs = fs
		.readdirSync(workspace, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);
	for (const dir of dirs) {
		const packageRoot: string = path.join(workspace, dir);
		const packageJsonPath: string = path.join(packageRoot, "package.json");
		if (!fs.existsSync(packageJsonPath)) {
			continue;
		}

		const packageString = fs.readFileSync(packageJsonPath, "utf8");

		let command = "nu --workspace";

		const match = packageString.match(/@agufaui\/\w+/g);
		const matchString = match
			?.map((m) => (path.join("packages", m.replace("@agufaui/", "")) !== packageRoot ? m : ""))
			.filter(Boolean)
			.join(" ");

		if (!matchString) {
			continue;
		}

		command = command + " " + matchString;

		execSync(command, {
			stdio: "inherit",
			cwd: packageRoot,
		});

		consola.success(`Updated ${workspace}/${dir}`);
	}
}
