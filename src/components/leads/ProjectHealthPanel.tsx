import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import type { WorkActivity } from "../../data/progress";

export function ProjectHealthPanel({ activities }: { activities: WorkActivity[] }) {
  const completed = activities.filter((activity) => activity.status === "on-track").length;
  const late = activities.filter((activity) => activity.status === "late").length;
  const risk = activities.filter((activity) => activity.status === "risk").length;
  const healthScore = activities.length ? Math.round((completed / activities.length) * 100) : 0;

  return (
    <article className="project-health panel-card">
      <header className="section-heading section-heading--compact">
        <div>
          <h2>Indicador de salud</h2>
          <p>Proyecto con atencion requerida</p>
        </div>
        <span className="health-score">{healthScore}%</span>
      </header>
      <div className="health-meter" aria-label="Salud del proyecto">
        <span style={{ width: `${healthScore}%` }} />
      </div>
      <div className="health-grid">
        <div>
          <CheckCircle2 aria-hidden="true" size={16} />
          <strong>{completed}</strong>
          <span>En tiempo</span>
        </div>
        <div>
          <Clock3 aria-hidden="true" size={16} />
          <strong>{late}</strong>
          <span>Atrasos</span>
        </div>
        <div>
          <AlertTriangle aria-hidden="true" size={16} />
          <strong>{risk}</strong>
          <span>Riesgo</span>
        </div>
      </div>
    </article>
  );
}