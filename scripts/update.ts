import fs from "fs-extra";
import { metadata } from "../packages/metadata/metadata";
import {
  updateContributors,
  updateImport,
  updateCountBadge,
  updateIndexREADME,
  updatePackageREADME,
} from "./utils";

async function run() {
  await Promise.all([
    updateImport(metadata),
    updatePackageREADME(metadata),
    updateIndexREADME(metadata),
    updateCountBadge(metadata),
    updateContributors(),
  ]);

  await fs.copy("./CONTRIBUTING.md", "./packages/contributing.md");
}

run();
