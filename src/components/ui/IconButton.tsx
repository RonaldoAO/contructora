import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  label: string;
};

export function IconButton({
  icon: Icon,
  label,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={["icon-button", className].filter(Boolean).join(" ")}
      title={label}
      type="button"
      {...props}
    >
      <Icon aria-hidden="true" size={15} strokeWidth={2} />
    </button>
  );
}
