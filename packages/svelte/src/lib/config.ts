import { writable } from "svelte/store";
import type { IConfig } from "@agufaui/config";

export const configStore = writable<IConfig>();
