import { presetUno } from "@unocss/preset-uno";
import { sep } from "path";
import { TMatchedRules } from "./config.type";

export const regexClassGroup = /([!\w+:_/-]+?)([:-])\(((?:[~!\w\s:/\\,%#.$-]|\[.*?\])*?)\)/g;

export function matchedRules(str: string, separator: string = ":"): TMatchedRules[] {
	regexClassGroup.lastIndex = 0;

	const classMatchedRules: TMatchedRules[] = [];

	if (!str) {
		return classMatchedRules;
	}

	const classNames: string[] = str.split(" ").filter(Boolean);

	const preset = presetUno();

	const theme = preset.theme!;
	const colors = theme.colors!;
	// console.log(theme);
	const rules = preset.rules!;
	const ruleSize = rules.length;

	for (const className of classNames) {
		const classMatch = getClassMatch(className, separator);

		if (classMatch.isIcon) {
			classMatchedRules.push(classMatch);
			continue;
		}

		const util = classMatch.util;

		for (let i = ruleSize - 1; i >= 0; i--) {
			const rule = rules[i];

			// static rules are omitted as undefined
			if (!rule) {
				continue;
			}

			// ignore internal rules
			if (rule[2]?.internal) continue;

			// dynamic rules
			const [matcher, handler, meta] = rule;

			if (meta?.prefix && !util.startsWith(meta.prefix)) continue;
			const unprefixed = meta?.prefix ? util.slice(meta.prefix.length) : util;
			const match = unprefixed.match(matcher);
			if (!match) continue;

			// const result = await handler(match, context);
			// if (!result) continue;

			// recordRule(rule);
			// // console.log(`raw: ${raw}`)
			// // console.log(`rule: ${rule}`)
			// const entries = normalizeCSSValues(result).filter((i) => i.length);
			// if (entries.length) {
			//   return entries.map((e) => {
			//     if (isString(e)) return [i, e, meta];
			//     else return [i, raw, e, meta, variantHandlers];
			//   });
			// }
		}
	}

	return classMatchedRules;
}

export function getClassMatch(className: string, separator: string): TMatchedRules {
	const classMatch: TMatchedRules = {
		raw: className,
		variant: "",
		rules: [],
		util: "",
		isIcon: false,
	};

	const splitVariants: string[] = className.split(separator);

	for (let i = 0; i < splitVariants.length; i++) {
		// if it's icon class
		if (splitVariants[i].startsWith("i-")) {
			classMatch.isIcon = true;
			for (i; i < splitVariants.length; i++) {
				if (i === splitVariants.length - 1) {
					classMatch.util += splitVariants[i];
					break;
				}

				classMatch.util += splitVariants[i] + separator;
			}
			break;
		}

		if (i === splitVariants.length - 1) {
			classMatch.util = splitVariants[i];
			break;
		}

		classMatch.variant += splitVariants[i] + separator;
	}

	return classMatch;
}
