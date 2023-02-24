import { Increment, Decrement, Computed } from "./comptest";
import type { ITestProps } from "./comptest";
import {
	component$,
	useStore,
	useSignal,
	createContextId,
	useContextProvider,
} from "@builder.io/qwik";
import { Config, CConfigProvideName, TConfig } from "@agufaui/config";
import { Theme } from "@agufaui/theme";

const CTX = createContextId<TConfig>(CConfigProvideName);

const config = new Config({
	locale: "en",
	baseTheme: Theme,
});

const tConfig: TConfig = {
	locale: config.locale,
	locales: config.locales,
	userTheme: config.userTheme,
};

export default component$(() => {
	useContextProvider(CTX, tConfig);

	// useBrowserVisibleTask$(() => {
	//     const CTX = createContextId<IConfig>(CConfigProvideName);
	//     const config = new Config({
	//         locale: "en",
	//         baseTheme: Theme,
	//     });

	//     useContextProvider(CTX, noSerialize(config)!);
	// });

	const store = useStore<ITestProps>({
		v: "Increment",
		count: 1,
	});

	const deCount = useSignal(1);
	const deV = useSignal("Decrement");

	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body>
				<Increment props={store} />
				<Decrement count={deCount} v={deV} />
				<Computed props={store} />
			</body>
		</>
	);
});
