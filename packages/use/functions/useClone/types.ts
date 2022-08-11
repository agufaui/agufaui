/**
 * @summary Clone objects and arrays.
 */
export interface IUseClone {
	/**
	 * Deep clone object and array.
	 * @example deepClone({ id : "1", obj: { oid: 1 } }) => { id: "1", obj: { oid: 1 } }
	 * @param obj Object to deep clone from
	 * @returns Deep clone of the object
	 */
	deepClone: <T>(obj: T) => T;

	/**
	 * Deep clone object and array by using json.
	 * @example jsonClone({ id : "1", obj: { oid: 1 } }) => { id: "1", obj: { oid: 1 } }
	 * @param obj Object to deep clone from
	 * @returns Deep clone of the object
	 */
	jsonClone: <T>(obj: T) => T;

	/**
	 * Shallow clone object and array.
	 * @example shallowClone({ id : "1", obj: { oid: 1 } }) => { id: "1", objReference }
	 * @param obj Object to shallow clone from
	 * @returns Shallow clone of the object
	 */
	shallowClone: <T>(obj: T) => T;
}
