import { AlertTriangle, CheckCircle2, Clock3, CircleDotDashed } from "lucide-react";
import type { ActivityStatus, ProgressReviewStatus } from "../../data/progress";

const activityMeta: Record<ActivityStatus, { className: string; icon: typeof CheckCircle2; label: string }> = {
  blocked: { className: "bg-rose-50 text-rose-700 ring-rose-100", icon: AlertTriangle, label: "Bloqueada" },
  completed: { className: "bg-emerald-50 text-emerald-700 ring-emerald-100", icon: CheckCircle2, label: "Completada" },
  in_progress: { className: "bg-amber-50 text-amber-700 ring-amber-100", icon: Clock3, label: "En progreso" },
  not_started: { className: "bg-neutral-100 text-neutral-600 ring-neutral-200", icon: CircleDotDashed, label: "Sin iniciar" },
  ready: { className: "bg-blue-50 text-blue-700 ring-blue-100", icon: CheckCircle2, label: "Lista" },
};

const reviewMeta: Record<ProgressReviewStatus, { className: string; label: string }> = {
  approved: { className: "bg-emerald-50 text-emerald-700 ring-emerald-100", label: "Aprobado" },
  observed: { className: "bg-sky-50 text-sky-700 ring-sky-100", label: "Observado" },
  pending: { className: "bg-amber-50 text-amber-700 ring-amber-100", label: "Pendiente" },
  rejected: { className: "bg-rose-50 text-rose-700 ring-rose-100", label: "Rechazado" },
};

export function ActivityStatusBadge({ status }: { status: ActivityStatus }) {
  const meta = activityMeta[status];
  const Icon = meta.icon;

  return (
    <span className={`inline-flex w-fit items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold ring-1 ${meta.className}`}>
      <Icon aria-hidden="true" size={13} />
      {meta.label}
    </span>
  );
}

export function ReviewStatusBadge({ status }: { status: ProgressReviewStatus }) {
  const meta = reviewMeta[status];

  return (
    <span className={`inline-flex w-fit items-center rounded-md px-2 py-1 text-[10px] font-semibold ring-1 ${meta.className}`}>
      {meta.label}
    </span>
  );
}