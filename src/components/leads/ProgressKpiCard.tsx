import type { ProgressKpi } from "../../data/progress";

export function ProgressKpiCard({ item }: { item: ProgressKpi }) {
  return (
    <article className={`progress-kpi progress-kpi--${item.tone}`}>
      <span>{item.label}</span>
      <strong>{item.value}</strong>
      <small>{item.detail}</small>
    </article>
  );
}