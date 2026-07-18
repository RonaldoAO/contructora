import type { ProgressDay } from "../../data/progress";
import { ProgressDayCard } from "./ProgressDayCard";

type ProgressCalendarProps = {
  days: ProgressDay[];
  evidenceByDay: Record<string, string[]>;
  onEvidenceUpload: (dayId: string, files: FileList) => void;
};

const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

export function ProgressCalendar({ days, evidenceByDay, onEvidenceUpload }: ProgressCalendarProps) {
  return (
    <section className="progress-calendar panel-card">
      <header className="section-heading section-heading--compact">
        <div>
          <h2>Calendario de avance</h2>
          <p>Entregable diario con avance planeado, real y evidencia</p>
        </div>
        <span className="project-period">Mayo 2026</span>
      </header>
      <div className="calendar-week-row" aria-hidden="true">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="progress-calendar__grid">
        {days.map((day) => (
          <ProgressDayCard
            day={day}
            evidence={evidenceByDay[day.id] ?? []}
            key={day.id}
            onEvidenceUpload={onEvidenceUpload}
          />
        ))}
      </div>
    </section>
  );
}