import { useMemo, useState } from "react";
import { CalendarDays, Download, Upload } from "lucide-react";
import type { EvidenceAsset, EvidenceKind } from "../../data/progress";
import { budgetMonths, progressKpis, timelineDays, workActivities } from "../../data/progress";
import { Button } from "../ui/Button";
import { BudgetAccumulator } from "./BudgetAccumulator";
import { ProgressKpiCard } from "./ProgressKpiCard";
import { ProjectHealthPanel } from "./ProjectHealthPanel";
import { WorkTimeline } from "./WorkTimeline";

type LeadsProgressPageProps = {
  selectedProjectName: string;
};

export function LeadsProgressPage({ selectedProjectName }: LeadsProgressPageProps) {
  const [evidenceByActivity, setEvidenceByActivity] = useState<Record<string, EvidenceAsset[]>>({
    "act-ceramic-301": [
      {
        id: "ev-ceramic-01",
        kind: "photo",
        name: "piso-ceramico-dia-01.jpg",
        status: "ready",
        uploadedBy: "Residente Soto",
      },
    ],
    "act-level2-waterproof": [
      {
        id: "ev-waterproof-01",
        kind: "document",
        name: "impermeabilizacion-final.pdf",
        status: "ready",
        uploadedBy: "Supervisor QA",
      },
      {
        id: "ev-waterproof-02",
        kind: "photo",
        name: "prueba-estanqueidad.jpg",
        status: "processing",
        uploadedBy: "Supervisor QA",
      },
    ],
  });
  const projectActivities = useMemo(
    () => workActivities.filter((activity) => activity.locationPath[0] === selectedProjectName),
    [selectedProjectName],
  );

  function handleEvidenceUpload(activityId: string, files: FileList, kind: EvidenceKind) {
    const uploadedFiles: EvidenceAsset[] = Array.from(files).map((file, index) => ({
      id: `${activityId}-${Date.now()}-${index}`,
      kind,
      name: file.name,
      status: "processing",
      uploadedBy: "Residente de obra",
    }));

    setEvidenceByActivity((current) => ({
      ...current,
      [activityId]: [...(current[activityId] ?? []), ...uploadedFiles],
    }));
  }

  return (
    <div className="leads-progress-page">
      <header className="leads-progress-page__header">
        <div>
          <span>Leads</span>
          <h1>Avance de obra</h1>
          <p>{selectedProjectName}: timeline por actividad, ubicacion jerarquica, evidencia y presupuesto.</p>
        </div>
        <div className="leads-progress-page__actions">
          <Button icon={CalendarDays}>Jul / Ago</Button>
          <Button icon={Upload}>Carga masiva</Button>
          <Button icon={Download} variant="primary">Reporte</Button>
        </div>
      </header>

      <section className="progress-kpi-grid" aria-label="Resumen de avance">
        {progressKpis.map((item) => (
          <ProgressKpiCard item={item} key={item.label} />
        ))}
      </section>

      <section className="timeline-page-layout">
        <WorkTimeline
          activities={projectActivities}
          days={timelineDays}
          evidenceByActivity={evidenceByActivity}
          onEvidenceUpload={handleEvidenceUpload}
          projectName={selectedProjectName}
        />
        <aside className="progress-side-panels">
          <ProjectHealthPanel activities={projectActivities} />
          <BudgetAccumulator data={budgetMonths} />
        </aside>
      </section>
    </div>
  );
}