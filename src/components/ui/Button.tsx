import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  icon: Icon,
  children,
  variant = "secondary",
  className = "",
  ...props
}: ButtonProps) {
  const classNames = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} type="button" {...props}>
      {Icon ? <Icon aria-hidden="true" size={14} strokeWidth={2} /> : null}
      {children ? <span>{children}</span> : null}
    </button>
  );
}
