import { CDefaultType, CUseType } from "@agufaui/config";
import type { IATableProps } from "../../types/table/ATable";

export const DATableDefault = {};

export const DATable: Readonly<Record<string, IATableProps>> = {
	[CDefaultType]: DATableDefault,
};
