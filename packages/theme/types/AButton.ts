import type { IPropsShared, IPropsComposeX, IPropsForm, IPropsIcon } from "../prop.type";

export type ButtonType = "button" | "submit" | "reset" | undefined;

export interface IAButtonProps extends IPropsShared, IPropsComposeX, IPropsForm, IPropsIcon {
  type?: ButtonType;
  text?: string;
  py?: string;
  px?: string;
  size?: string;
  color?: string;
  round?: string;
  bg?: string;
  ifHover?: string;
  ifFocus?: string;
  full?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  loadingClass?: string;

  /**
   * @todo: when vue 3 supports import extends interface for defineProps in SFC,
   * remove below code.  Also remove devDeps vite-plugin-vue-type-imports in package.json.
   */
  aType?: string;
  aClass?: string;
  disabled?: boolean;
  spaceX?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconClass?: string;
}

export interface IAButtonEmits {
  (e: "click", event: MouseEvent): void;
}
