import { execSync } from "child_process";
import path from "path";
import consola from "consola";
import fs from "fs";

execSync("pnpm run build", { stdio: "inherit" });

// const packages = ["config", "theme", "metadata", "use", "vue"];
const packages = ["use"];

for (const name of packages) {
  const dist: string = path.join("packages", name, "dist");
  const packageRoot: string = path.join("packages", name);

  const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));

  const version = packageJson.version;

  let command = "pnpm publish --no-git-checks --access public";

  if (version.includes("beta")) command += " --tag beta";

  execSync(command, {
    stdio: "inherit",
    cwd: dist,
  });
  consola.success(`Published @agufaui/${name}`);
}
