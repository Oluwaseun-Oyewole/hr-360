import classNames from "classnames";
import { createElement, HTMLProps, PropsWithChildren } from "react";

export type TypographyProps<T = HTMLElement> = {
  type?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  variant?:
    | "textXs"
    | "textMd"
    | "textSm"
    | "textXl"
    | "displayMd"
    | "displaySm"
    | "displayXs";
  weight?: "regular" | "medium" | "semi-bold";
  className?: string;
} & HTMLProps<T>;

function HrTypography<T = HTMLElement>({
  type = "p",
  className,
  children,
  variant = "textSm",
  weight = "regular",
  ...props
}: PropsWithChildren<TypographyProps<T>>) {
  const getVariantClassName = () => {
    let variantClassName = "text-sm";
    if (variant === "textXs") {
      variantClassName = "text-xs";
    } else if (variant === "textMd") {
      variantClassName = "text-base";
    } else if (variant === "displayMd") {
      variantClassName = "text-4xl";
    } else if (variant === "displaySm") {
      variantClassName = "text-3xl";
    } else if (variant === "displayXs") {
      variantClassName = "text-2xl";
    } else if (variant === "textXl") {
      variantClassName = "text-xl";
    }
    return variantClassName;
  };

  const getWeightClassName = () => {
    let weightClassName = "font-normal";
    if (weight === "medium") {
      weightClassName = "font-medium";
    } else if (weight === "semi-bold") {
      weightClassName = "font-semibold";
    }
    return weightClassName;
  };

  return createElement(
    type,
    {
      className: classNames(
        className,
        getVariantClassName(),
        getWeightClassName()
      ),
      ...props,
    },
    children
  );
}

export default HrTypography;
