import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@vue/runtime-dom" {
	interface HTMLAttributes extends AttributifyAttributes {}
}

import type { AttributifyNames } from "@unocss/preset-attributify";

type Prefix = "u-"; // change it to your prefix

interface HTMLAttributes extends Partial<Record<AttributifyNames<Prefix>, string>> {}
