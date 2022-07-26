export type TProps = string | boolean;

export interface IProps {
  [key: string]: TProps;
}

export interface IPropsShared {
  // component type
  aType?: string;
  // component class
  aClass?: string;
}

export interface IPropsComposeX {
  spaceX?: string;
}

export interface IPropsComposeY {
  spaceY?: string;
}

export interface IPropsForm {
  disabled?: boolean;
}

export interface IPropsIcon {
  icon?: string;
  iconPosition?: "left" | "right";
  iconClass?: string;
}

export interface IPropsLoading extends IPropsIcon {
  loading?: boolean;
}
