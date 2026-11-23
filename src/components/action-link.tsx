import type { AnchorHTMLAttributes } from "react";
import { Icon } from "./icon";

export function HoverText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`hover-text ${className}`}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

export function ActionLink({
  children,
  className = "",
  arrow = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: string;
  arrow?: boolean;
}) {
  return (
    <a {...props} className={`button ${className}`}>
      <HoverText className="button-label">{children}</HoverText>
      {arrow && <Icon name="arrow" />}
    </a>
  );
}

export function SectionLabel({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <p className={`section-label ${light ? "label-light" : ""}`}>
      <Icon name="plus" />
      {children}
    </p>
  );
}
