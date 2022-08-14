export const regexClassGroup =
	/((?:[!\w+:_/-]|\[&?>?:.+?\])+?)([:-])\(((?:[~!\w\s:/\\,%#.$-]|\[.*?\])*?)\)/gm;

export function expandVariantGroup(str: string, separators: ("-" | ":")[] = ["-", ":"]) {
	regexClassGroup.lastIndex = 0;
	let hasChanged = false;
	let content = str;

	do {
		const before = content;

		content = content.replace(regexClassGroup, (from, pre, sep, body: string) => {
			if (!separators.includes(sep)) return from;
			return body
				.split(/\s/g)
				.filter(Boolean)
				.map((i) => (i === "~" ? pre : i.replace(/^(!?)(.*)/, `$1${pre}${sep}$2`)))
				.join(" ");
		});
		hasChanged = content !== before;
	} while (hasChanged);

	return content;
}
