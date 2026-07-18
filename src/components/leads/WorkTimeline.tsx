import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { EvidenceAsset, EvidenceKind, TimelineDay, WorkActivity } from "../../data/progress";
import { EmptyState } from "../ui/EmptyState";
import { ActivityStatusBadge, ReviewStatusBadge } from "../work/ActivityStatusBadge";
import { EvidenceUploader } from "../work/EvidenceUploader";
import { ProgressComparison } from "../work/ProgressComparison";

type EvidenceMap = Record<string, EvidenceAsset[]>;

type LocationNode = {
  id: string;
  label: string;
  depth: number;
  children: LocationNode[];
  activities: WorkActivity[];
};

type TimelineRow =
  | { type: "group"; id: string; label: string; depth: number; count: number }
  | { type: "activity"; activity: WorkActivity; depth: number };

function getRelativeLocationPath(activity: WorkActivity, projectName: string) {
  return activity.locationPath[0] === projectName ? activity.locationPath.slice(1) : activity.locationPath;
}

function buildLocationTree(activities: WorkActivity[], projectName: string) {
  const root: LocationNode = { id: "root", label: "root", depth: -1, children: [], activities: [] };

  activities.forEach((activity) => {
    let node = root;

    getRelativeLocationPath(activity, projectName).forEach((segment, index) => {
      const id = `${node.id}/${segment}`;
      let child = node.children.find((item) => item.id === id);

      if (!child) {
        child = { id, label: segment, depth: index, children: [], activities: [] };
        node.children.push(child);
      }

      node = child;
    });

    node.activities.push(activity);
  });

  return root;
}

function countActivities(node: LocationNode): number {
  return node.activities.length + node.children.reduce((total, child) => total + countActivities(child), 0);
}

function collectGroupIds(node: LocationNode): string[] {
  return node.children.flatMap((child) => [child.id, ...collectGroupIds(child)]);
}

function flattenTree(node: LocationNode, collapsedGroups: Set<string>): TimelineRow[] {
  return node.children.flatMap((child) => {
    const groupRow: TimelineRow = {
      type: "group",
      id: child.id,
      label: child.label,
      depth: child.depth,
      count: countActivities(child),
    };

    if (collapsedGroups.has(child.id)) {
      return [groupRow];
    }

    return [
      groupRow,
      ...child.activities.map((activity) => ({ type: "activity", activity, depth: child.depth + 1 }) as TimelineRow),
      ...flattenTree(child, collapsedGroups),
    ];
  });
}

function dateIndex(days: TimelineDay[], date: string) {
  const index = days.findIndex((day) => day.date === date);
  return Math.max(index, 0);
}

function cssVars(vars: Record<string, string | number>) {
  return vars as CSSProperties;
}

function getBarStyle(days: TimelineDay[], start: string, end: string) {
  const startIndex = dateIndex(days, start);
  const endIndex = dateIndex(days, end);

  return {
    gridColumn: `${startIndex + 1} / ${endIndex + 2}`,
  };
}

function ActivityDetails({ activity, projectName }: { activity: WorkActivity; projectName: string }) {
  const relativeLocationPath = getRelativeLocationPath(activity, projectName);

  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <strong className="truncate text-xs font-bold text-neutral-950">{activity.activity}</strong>
        <span className="text-[10px] text-neutral-500">{activity.trade}</span>
        <small className="truncate text-[10px] text-neutral-500">{relativeLocationPath.join(" / ")}</small>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-[9px]">
        <div className="min-w-0">
          <dt className="truncate text-neutral-400">Responsable</dt>
          <dd className="truncate text-neutral-800">{activity.responsible}</dd>
        </div>
        <div className="min-w-0">
          <dt className="truncate text-neutral-400">Cantidad</dt>
          <dd className="truncate text-neutral-800">{activity.quantity}</dd>
        </div>
        <div className="min-w-0">
          <dt className="truncate text-neutral-400">Costo</dt>
          <dd className="truncate text-neutral-800">${activity.budgetedCost.toLocaleString()}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center gap-1.5">
        <ActivityStatusBadge status={activity.activityStatus} />
        <ReviewStatusBadge status={activity.reviewStatus} />
      </div>
      <ProgressComparison
        approved={activity.approvedProgress}
        planned={activity.plannedProgress}
        reported={activity.reportedProgress}
      />
      {activity.blocker ? (
        <div className="rounded-md bg-rose-50 px-2 py-1.5 text-[10px] leading-4 text-rose-700 ring-1 ring-rose-100">
          <strong>Bloqueo:</strong> {activity.blocker}
        </div>
      ) : null}
    </div>
  );
}

function TimelineBars({ activity, days }: { activity: WorkActivity; days: TimelineDay[] }) {
  return (
    <div className="timeline-bars" style={cssVars({ "--columns": days.length })}>
      <span
        className="timeline-bar timeline-bar--planned"
        style={getBarStyle(days, activity.plannedStart, activity.plannedEnd)}
      >
        Planeado {activity.plannedProgress}%
      </span>
      <span
        className={`timeline-bar timeline-bar--actual timeline-bar--${activity.status}`}
        style={getBarStyle(days, activity.actualStart, activity.actualEnd)}
      >
        Real {activity.actualProgress}%
      </span>
    </div>
  );
}

type WorkTimelineProps = {
  activities: WorkActivity[];
  days: TimelineDay[];
  evidenceByActivity: EvidenceMap;
  onEvidenceUpload: (activityId: string, files: FileList, kind: EvidenceKind) => void;
  projectName: string;
};

export function WorkTimeline({ activities, days, evidenceByActivity, onEvidenceUpload, projectName }: WorkTimelineProps) {
  const locationTree = useMemo(() => buildLocationTree(activities, projectName), [activities, projectName]);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => new Set());
  const rows = useMemo(() => flattenTree(locationTree, collapsedGroups), [collapsedGroups, locationTree]);

  function toggleGroup(groupId: string) {
    setCollapsedGroups((current) => {
      const next = new Set(current);

      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }

      return next;
    });
  }

  function setAllGroups(collapsed: boolean) {
    setCollapsedGroups(collapsed ? new Set(collectGroupIds(locationTree)) : new Set());
  }

  return (
    <section className="work-timeline panel-card">
      <header className="section-heading section-heading--compact">
        <div>
          <h2>Planeacion por actividad</h2>
          <p>{projectName}: fechas en eje X, actividades en eje Y y agrupacion por ubicacion</p>
        </div>
        <div className="timeline-header-actions">
          <button type="button" onClick={() => setAllGroups(false)}>Expandir</button>
          <button type="button" onClick={() => setAllGroups(true)}>Replegar</button>
          <span className="project-period">Jul / Ago 2026</span>
        </div>
      </header>

      <div className="work-timeline__viewport">
        <div className="work-timeline__grid" style={cssVars({ "--columns": days.length })}>
          <div className="timeline-corner">Ubicacion / Actividad</div>
          <div className="timeline-date-header" style={cssVars({ "--columns": days.length })}>
            {days.map((day) => (
              <div className={day.isToday ? "timeline-date timeline-date--today" : "timeline-date"} key={day.date}>
                <span>{day.month}</span>
                <strong>{day.day}</strong>
              </div>
            ))}
          </div>

          {rows.length === 0 ? (
            <div className="col-span-full p-4">
              <EmptyState
                description="Selecciona otro proyecto o carga actividades desde el cronograma aprobado."
                title="No hay actividades para este proyecto"
              />
            </div>
          ) : null}

          {rows.map((row) =>
            row.type === "group" ? (
              <div className="timeline-row timeline-row--group" key={row.id}>
                <button
                  aria-expanded={!collapsedGroups.has(row.id)}
                  className="timeline-left-cell timeline-group-button"
                  onClick={() => toggleGroup(row.id)}
                  style={cssVars({ "--depth": row.depth })}
                  type="button"
                >
                  <ChevronDown aria-hidden="true" className="timeline-group-button__chevron" size={13} />
                  <strong>{row.label}</strong>
                  <small>{row.count} actividades</small>
                </button>
                <div className="timeline-grid-cell timeline-grid-cell--group" style={cssVars({ "--columns": days.length })} />
              </div>
            ) : (
              <div className="timeline-row" key={row.activity.id}>
                <div className="timeline-left-cell timeline-left-cell--activity" style={cssVars({ "--depth": row.depth })}>
                  <ActivityDetails activity={row.activity} projectName={projectName} />
                  <EvidenceUploader
                    activityId={row.activity.id}
                    evidence={evidenceByActivity[row.activity.id] ?? []}
                    onEvidenceUpload={onEvidenceUpload}
                  />
                </div>
                <div className="timeline-grid-cell" style={cssVars({ "--columns": days.length })}>
                  <TimelineBars activity={row.activity} days={days} />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}