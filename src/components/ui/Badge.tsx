import type { Priority } from "../../types/deals";

type BadgeProps = {
  label: Priority | string;
  tone?: "low" | "medium" | "high" | "neutral";
};

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{label}</span>;
}
