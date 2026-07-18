import { Info } from "lucide-react";
import type { MetricGroup } from "../../types/deals";

type MetricsRowProps = {
  groups: MetricGroup[];
};

export function MetricsRow({ groups }: MetricsRowProps) {
  return (
    <section className="metrics-grid" aria-label="Metricas del pipeline">
      {groups.map((group) => (
        <article className="metric-group" key={group.title}>
          <div className="metric-group__header">
            <h2>{group.title}</h2>
            <Info aria-hidden="true" size={13} />
          </div>
          <div className="metric-group__items">
            {group.metrics.map((metric) => (
              <div className="metric-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small className={`trend trend--${metric.tone}`}>
                  {metric.delta}
                </small>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
