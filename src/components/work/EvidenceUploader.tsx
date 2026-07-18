import type { ChangeEvent } from "react";
import { Camera, FileAudio, FileImage, FileText, ImagePlus, RotateCcw, UploadCloud } from "lucide-react";
import type { EvidenceAsset, EvidenceKind } from "../../data/progress";

const evidenceActions: Array<{ accept: string; capture?: "environment" | "user"; icon: typeof Camera; kind: EvidenceKind; label: string }> = [
  { accept: "image/*", capture: "environment", icon: Camera, kind: "photo", label: "Camara" },
  { accept: "image/*,video/*", icon: ImagePlus, kind: "gallery", label: "Galeria" },
  { accept: ".pdf,.doc,.docx,.xls,.xlsx,image/*", icon: FileText, kind: "document", label: "Archivo" },
  { accept: "audio/*", icon: FileAudio, kind: "audio", label: "Audio" },
];

function statusClass(status: EvidenceAsset["status"]) {
  return {
    error: "bg-rose-50 text-rose-700 ring-rose-100",
    pending: "bg-neutral-100 text-neutral-600 ring-neutral-200",
    processing: "bg-blue-50 text-blue-700 ring-blue-100",
    ready: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    uploading: "bg-amber-50 text-amber-700 ring-amber-100",
  }[status];
}

function statusLabel(status: EvidenceAsset["status"]) {
  return {
    error: "Error",
    pending: "Pendiente",
    processing: "Procesando",
    ready: "Disponible",
    uploading: "Subiendo",
  }[status];
}

export function EvidenceUploader({
  activityId,
  evidence,
  onEvidenceUpload,
}: {
  activityId: string;
  evidence: EvidenceAsset[];
  onEvidenceUpload: (activityId: string, files: FileList, kind: EvidenceKind) => void;
}) {
  function handleChange(event: ChangeEvent<HTMLInputElement>, kind: EvidenceKind) {
    if (event.target.files?.length) {
      onEvidenceUpload(activityId, event.target.files, kind);
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-2">
      <div className="flex items-start gap-2">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-neutral-200">
          <UploadCloud aria-hidden="true" size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <strong className="block text-[11px] text-neutral-950">Evidencia de avance</strong>
          <p className="mt-0.5 text-[10px] leading-4 text-neutral-500">Carga sin bloquear el reporte. Se confirmara con backend antes de aprobar.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {evidenceActions.map((action) => {
          const Icon = action.icon;

          return (
            <label
              className="flex min-h-10 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 text-[10px] font-semibold text-neutral-700 hover:bg-neutral-100"
              key={action.kind}
            >
              <Icon aria-hidden="true" size={14} />
              {action.label}
              <input
                accept={action.accept}
                capture={action.capture}
                className="sr-only"
                multiple
                onChange={(event) => handleChange(event, action.kind)}
                type="file"
              />
            </label>
          );
        })}
      </div>

      <div className="grid gap-1.5">
        {evidence.length ? (
          evidence.slice(0, 3).map((asset) => (
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-md bg-white px-2 py-1.5 ring-1 ring-neutral-200" key={asset.id}>
              <FileImage aria-hidden="true" className="text-neutral-500" size={14} />
              <span className="truncate text-[10px] text-neutral-700">{asset.name}</span>
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ring-1 ${statusClass(asset.status)}`}>
                {statusLabel(asset.status)}
              </span>
            </div>
          ))
        ) : (
          <span className="rounded-md bg-white px-2 py-2 text-center text-[10px] text-neutral-500 ring-1 ring-neutral-200">Sin evidencia cargada</span>
        )}
        {evidence.some((asset) => asset.status === "error") ? (
          <button className="inline-flex w-fit items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-rose-700 hover:bg-rose-50" type="button">
            <RotateCcw aria-hidden="true" size={12} />
            Reintentar fallidas
          </button>
        ) : null}
      </div>
    </div>
  );
}