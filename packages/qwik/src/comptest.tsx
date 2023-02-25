import {
	component$,
	Signal,
	createContextId,
	useContext,
	useResource$,
	useSignal,
} from "@builder.io/qwik";
import type { IConfig, TConfig } from "@agufaui/config";
import { CConfigProvideName, Config } from "@agufaui/config";

export interface ITestProps {
	v: string;
	c?: string;
	count: number;
	i?: string;
}

export interface IComProps {
	props: ITestProps;
}

// reactive props using useStore
export const Increment = component$(({ props }: IComProps) => {
	return (
		<>
			<button onClick$={() => props.count++}>{props.v}</button>
			Count: {props.count}
		</>
	);
});

export interface ISignalProps {
	v: Signal<string>;
	c?: string;
	count: Signal<number>;
}

// reactive props using useSignal
export const Decrement = component$((props: ISignalProps) => {
	return (
		<>
			<button onClick$={() => props.count.value--}>{props.v.value}</button>
			Count: {props.count.value}
		</>
	);
});

// computed properties
export const Computed = component$(({ props }: IComProps) => {
	const CTX = createContextId<TConfig>(CConfigProvideName);
	const tConfig = useContext(CTX);

	const config: IConfig = new Config();

	config.locale = tConfig.locale;
	config.locales = tConfig.locales;
	config.userTheme = tConfig.userTheme;

	const cc = useResource$<number>(({ track }) => {
		track(() => props.count);
		return props.count * 2;
	});

	const showAlert = useSignal(false);
	const textGreen = useSignal("color: green;");
	const borderGreen = useSignal("outline: 1;");
	return (
		<>
			<button
				style={textGreen.value + borderGreen.value + " background:#3630a3;"}
				onClick$={() => props.count++}
			>
				{props.v}
			</button>
			Count: {props.count}
			double: {cc.value.then((value) => value)}
			{showAlert.value && <p>hi</p>}
		</>
	);
});
