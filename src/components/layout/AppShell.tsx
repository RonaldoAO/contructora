import type { ReactNode } from "react";
import type { AppView } from "../../types/deals";
import { Sidebar } from "./Sidebar";
import { TopBar, type ProjectOption } from "./TopBar";

type AppShellProps = {
  activeView: AppView;
  children: ReactNode;
  onProjectChange: (projectId: string) => void;
  onViewChange: (view: AppView) => void;
  projects: ProjectOption[];
  selectedProjectId: string;
};

export function AppShell({
  activeView,
  children,
  onProjectChange,
  onViewChange,
  projects,
  selectedProjectId,
}: AppShellProps) {
  return (
    <main className="workspace">
      <section className="app-window" aria-label="CRM de propiedades">
        <Sidebar activeView={activeView} onViewChange={onViewChange} />
        <div className="app-main">
          <TopBar
            onProjectChange={onProjectChange}
            projects={projects}
            selectedProjectId={selectedProjectId}
          />
          <div className="content">{children}</div>
        </div>
      </section>
    </main>
  );
}