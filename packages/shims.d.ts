/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module "*.md" {
  import type { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare module "@vue/runtime-dom" {
  interface HTMLAttributes extends AttributifyAttributes {}
}

import type { AttributifyNames } from "@unocss/preset-attributify";

type Prefix = "u-"; // change it to your prefix

interface HTMLAttributes
  extends Partial<Record<AttributifyNames<Prefix>, string>> {}
