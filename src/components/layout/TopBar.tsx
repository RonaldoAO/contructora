import { Bell, Ellipsis, Search } from "lucide-react";
import { IconButton } from "../ui/IconButton";

export type ProjectOption = {
  id: string;
  name: string;
};

type TopBarProps = {
  projects: ProjectOption[];
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
};

export function TopBar({ projects, selectedProjectId, onProjectChange }: TopBarProps) {
  return (
    <header className="topbar">
      <label className="search-field">
        <Search aria-hidden="true" size={15} />
        <input placeholder="Search by client, phone or property ID" type="search" />
      </label>
      <div className="topbar__actions">
        <label className="project-selector">
          <span>Proyecto</span>
          <select
            aria-label="Seleccionar proyecto"
            onChange={(event) => onProjectChange(event.target.value)}
            value={selectedProjectId}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <IconButton icon={Bell} label="Notificaciones" />
        <IconButton icon={Ellipsis} label="Mas opciones" />
      </div>
    </header>
  );
}