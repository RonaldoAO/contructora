export function ProgressComparison({
  approved,
  planned,
  reported,
}: {
  approved: number;
  planned: number;
  reported: number;
}) {
  const variance = approved - planned;

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2 text-[9px] text-neutral-500">
        <span>Plan {planned}%</span>
        <span>Aprob. {approved}%</span>
        <span>Rep. {reported}%</span>
      </div>
      <div className="grid gap-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <span className="block h-full rounded-full bg-blue-400" style={{ width: `${planned}%` }} />
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <span className="block h-full rounded-full bg-emerald-500" style={{ width: `${approved}%` }} />
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <span className="block h-full rounded-full bg-amber-500" style={{ width: `${reported}%` }} />
        </div>
      </div>
      <span className={variance < 0 ? "text-[10px] font-semibold text-rose-600" : "text-[10px] font-semibold text-emerald-600"}>
        {variance > 0 ? "+" : ""}{variance} pts vs plan
      </span>
    </div>
  );
}