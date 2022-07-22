export interface ThemeShared {
  // component type
  aType?: string;
  // component class
  aClass?: string;
}

export interface ThemeComposeX {
  spaceX?: string;
}

export interface ThemeComposeY {
  spaceY?: string;
}

export interface ThemeForm {
  disabled?: boolean;
}

export interface ThemeIcon {
  icon?: string;
  iconPosition?: "left" | "right";
  iconClass?: string;
}

export interface ThemeLoading extends ThemeIcon {
  loading?: boolean;
}
