/**
 * @summary Deep clone copy objects and arrays.
 */
export interface AUseDeepCloneReturn {
  /**
   * @description Deep clone copy an object or array.
   * @example pascalCaseToSpace({ id : "1" }) // { id: "1" }
   * @param obj Object to deep clone copy
   * @returns Deep clone copy of the object
   */
  deepClone: <T>(obj: T) => T;
}
