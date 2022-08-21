import { ComputedRef } from "vue";

/**
 * @summary Shared composables for Vue components.
 */
export interface IUseVue {
	/**
	 * Get computed properties from Vue component props.  For each prop, create a computed
	 * property that either use prop's value if value exist, or use default value or user defined value
	 * for that prop from config
	 * @param props Vue Component Props (from defineProps<T>()) to get computed properties from
	 * @param component Component name
	 * @param config  Config object with Props default values or user defined values
	 * @returns Record of computed properties based on props
	 */
	getComputedFromProps: <T>(
		props: Readonly<T>,
		component: string,
		defaultValues: Record<string, any>
	) => Record<string, ComputedRef>;
}
