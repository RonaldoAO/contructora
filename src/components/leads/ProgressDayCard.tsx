import type { ChangeEvent } from "react";
import { AlertTriangle, CheckCircle2, Clock3, Upload } from "lucide-react";
import type { ProgressDay, ProgressStatus } from "../../data/progress";

const statusMeta: Record<ProgressStatus, { icon: typeof CheckCircle2; label: string }> = {
  "on-track": { icon: CheckCircle2, label: "En tiempo" },
  late: { icon: Clock3, label: "Atrasado" },
  risk: { icon: AlertTriangle, label: "Riesgo" },
  pending: { icon: Clock3, label: "Pendiente" },
};

type ProgressDayCardProps = {
  day: ProgressDay;
  evidence: string[];
  onEvidenceUpload: (dayId: string, files: FileList) => void;
};

export function ProgressDayCard({ day, evidence, onEvidenceUpload }: ProgressDayCardProps) {
  const meta = statusMeta[day.status];
  const StatusIcon = meta.icon;
  const delta = day.actual ? day.actual - day.planned : -day.planned;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      onEvidenceUpload(day.id, event.target.files);
      event.target.value = "";
    }
  }

  return (
    <article className={`progress-day progress-day--${day.status}`}>
      <header className="progress-day__header">
        <div>
          <span>{day.weekday}</span>
          <strong>{day.day}</strong>
        </div>
        <span className="progress-day__status">
          <StatusIcon aria-hidden="true" size={13} />
          {meta.label}
        </span>
      </header>

      <h3>{day.deliverable}</h3>
      <div className="progress-day__bars" aria-label="Avance planeado y real">
        <div>
          <span>Plan {day.planned}%</span>
          <strong style={{ width: `${day.planned}%` }} />
        </div>
        <div>
          <span>Real {day.actual}%</span>
          <strong style={{ width: `${day.actual}%` }} />
        </div>
      </div>

      <footer className="progress-day__footer">
        <span className={delta < 0 ? "delta delta--bad" : "delta delta--good"}>
          {delta > 0 ? "+" : ""}{delta} pts
        </span>
        <label className="evidence-upload">
          <Upload aria-hidden="true" size={13} />
          <span>{evidence.length ? `${evidence.length} evidencias` : "Subir evidencia"}</span>
          <input multiple onChange={handleFileChange} type="file" />
        </label>
      </footer>
      {evidence.length ? (
        <ul className="evidence-list">
          {evidence.map((fileName) => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}