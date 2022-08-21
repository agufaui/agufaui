import type { PackageIndexes } from "./types";
import _metadata, {
	categories as _categories,
	fncategories as _fncategories,
	components as _components,
	functions as _functions,
	packages as _packages,
} from "./index.json";

const categoriesOrder = [
	"Basic",
	"Utility",
	"Form",
	"Navigation",
	"Composed",
	"Data",
	"Feedback",
	"Configuration",
	"Misc",
];

const fncategoriesOrder = ["Component", "String"];

export const metadata = _metadata as PackageIndexes;
export const components = _components as PackageIndexes["components"];
export const functions = _functions as PackageIndexes["functions"];
export const packages = _packages as PackageIndexes["packages"];
export const categories = _categories as PackageIndexes["categories"];
export const fncategories = _fncategories as PackageIndexes["fncategories"];

export const componentNames = components.map((c) => c.name);
export const functionNames = functions.map((f) => f.name);
export const categoryNames = Array.from(categories)
	.sort((a, b) => categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b))
	.sort((a, b) => (a.startsWith("@") ? 1 : b.startsWith("@") ? -1 : 0));
export const coreCategoryNames = categoryNames.filter((c) => !c.startsWith("@"));
export const fncategoryNames = Array.from(fncategories)
	.sort((a, b) => fncategoriesOrder.indexOf(a) - fncategoriesOrder.indexOf(b))
	.sort((a, b) => (a.startsWith("@") ? 1 : b.startsWith("@") ? -1 : 0));
export const coreFnCategoryNames = fncategoryNames.filter((c) => !c.startsWith("@"));
export const addonCategoryNames = categoryNames.filter((f) => f.startsWith("@"));
export const addonFnCategoryNames = fncategoryNames.filter((f) => f.startsWith("@"));

export const getComponent = (name: string) => metadata.components.find((c) => c.name === name);
export const getFunction = (name: string) => metadata.functions.find((f) => f.name === name);
