export type ButtonType = "button" | "submit" | "reset" | undefined;

export interface AButtonProps {
  type?: ButtonType;
  aType?: string | undefined;
  py?: string;
  px?: string;
  text?: string;
  size?: string;
  color?: string;
  round?: string;
  bg?: string;
  ifHover?: string;
  ifFocus?: string;
  full?: boolean;
  disabled?: boolean;
  aClass?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: string;
  iconPositon?: "left" | "right";
  iconClass?: string;
  loading?: boolean;
  loadingIcon?: string;
  loadingClass?: string;
  spaceBetween?: string;
}
