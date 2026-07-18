import { useMemo, useState } from "react";
import { LeadsProgressPage } from "./components/leads/LeadsProgressPage";
import { AppShell } from "./components/layout/AppShell";
import type { ProjectOption } from "./components/layout/TopBar";
import { DealsPipelinePage } from "./components/pipeline/DealsPipelinePage";
import { PropertiesDashboard } from "./components/properties/PropertiesDashboard";
import type { AppView } from "./types/deals";

const projects: ProjectOption[] = [
  { id: "torre-ambar", name: "Proyecto Torre Ambar" },
  { id: "plaza-norte", name: "Proyecto Plaza Norte" },
  { id: "costa-azul", name: "Proyecto Costa Azul" },
];

export default function App() {
  const [activeView, setActiveView] = useState<AppView>("properties");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );

  const currentPage = {
    deals: <DealsPipelinePage />,
    leads: <LeadsProgressPage selectedProjectName={selectedProject.name} />,
    properties: <PropertiesDashboard />,
  }[activeView];

  return (
    <AppShell
      activeView={activeView}
      onProjectChange={setSelectedProjectId}
      onViewChange={setActiveView}
      projects={projects}
      selectedProjectId={selectedProjectId}
    >
      {currentPage}
    </AppShell>
  );
}