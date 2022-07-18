import type { PackageManifest } from ".";

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
    display: "AgufaUI",
    description: "Vue UI Library",
    path: "core/components",
  },
  {
    name: "use",
    display: "Use",
    description: "Composables for AgufaUI core components",
    path: "use/functions",
  },
];
