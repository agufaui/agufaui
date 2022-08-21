export const langs: Record<string, string> = {
	auto: "Automatic",
	af: "Afrikaans",
	sq: "Albanian",
	am: "Amharic",
	ar: "Arabic",
	hy: "Armenian",
	az: "Azerbaijani",
	eu: "Basque",
	be: "Belarusian",
	bn: "Bengali",
	bs: "Bosnian",
	bg: "Bulgarian",
	ca: "Catalan",
	ceb: "Cebuano",
	ny: "Chichewa",
	"zh-cn": "Chinese Simplified",
	"zh-tw": "Chinese Traditional",
	co: "Corsican",
	hr: "Croatian",
	cs: "Czech",
	da: "Danish",
	nl: "Dutch",
	en: "English",
	eo: "Esperanto",
	et: "Estonian",
	tl: "Filipino",
	fi: "Finnish",
	fr: "French",
	fy: "Frisian",
	gl: "Galician",
	ka: "Georgian",
	de: "German",
	el: "Greek",
	gu: "Gujarati",
	ht: "Haitian Creole",
	ha: "Hausa",
	haw: "Hawaiian",
	he: "Hebrew",
	hi: "Hindi",
	hmn: "Hmong",
	hu: "Hungarian",
	is: "Icelandic",
	ig: "Igbo",
	id: "Indonesian",
	ga: "Irish",
	it: "Italian",
	ja: "Japanese",
	jw: "Javanese",
	kn: "Kannada",
	kk: "Kazakh",
	km: "Khmer",
	rw: "Kinyarwanda",
	ko: "Korean",
	ku: "Kurdish (Kurmanji)",
	ky: "Kyrgyz",
	lo: "Lao",
	la: "Latin",
	lv: "Latvian",
	lt: "Lithuanian",
	lb: "Luxembourgish",
	mk: "Macedonian",
	mg: "Malagasy",
	ms: "Malay",
	ml: "Malayalam",
	mt: "Maltese",
	mi: "Maori",
	mr: "Marathi",
	mn: "Mongolian",
	my: "Myanmar (Burmese)",
	ne: "Nepali",
	no: "Norwegian",
	or: "Odia",
	ps: "Pashto",
	fa: "Persian",
	pl: "Polish",
	pt: "Portuguese",
	pa: "Punjabi",
	ro: "Romanian",
	ru: "Russian",
	sm: "Samoan",
	gd: "Scots Gaelic",
	sr: "Serbian",
	st: "Sesotho",
	sn: "Shona",
	sd: "Sindhi",
	si: "Sinhala",
	sk: "Slovak",
	sl: "Slovenian",
	so: "Somali",
	es: "Spanish",
	su: "Sundanese",
	sw: "Swahili",
	sv: "Swedish",
	tg: "Tajik",
	ta: "Tamil",
	tt: "Tatar",
	te: "Telugu",
	th: "Thai",
	tr: "Turkish",
	tk: "Turkmen",
	uk: "Ukrainian",
	ur: "Urdu",
	ug: "Uyghur",
	uz: "Uzbek",
	vi: "Vietnamese",
	cy: "Welsh",
	xh: "Xhosa",
	yi: "Yiddish",
	yo: "Yoruba",
	zu: "Zulu",
};

/**
 * @returns {string[]} The ISO 639-1 codes of all the languages supported by Google Translate
 */
export function getAllCodes(): string[] {
	return Object.keys(langs);
}

/**
 * Returns the ISO 639-1 code of the language – if it is supported by Google Translate
 * @param {string} lang – the name or the code of the language
 * @returns {string|boolean} The ISO 639-1 code of the language or false if the language is not supported
 */
export function getCode(lang: string): string {
	if (!lang) {
		return "";
	}

	lang = lang.toLowerCase();

	if (langs[lang]) {
		return lang;
	}

	const keys = Object.keys(langs).filter((key) => {
		if (typeof langs[key] !== "string") {
			return "";
		}

		return langs[key].toLowerCase() === lang;
	});

	return keys[0] || "";
}

/**
 * Returns true if the language is supported by Google Translate and false otherwise
 * @param {string} lang – the ISO 639-1 code or the name of the language
 * @returns {boolean}
 */
export function isSupported(lang: string): boolean {
	return Boolean(getCode(lang));
}
