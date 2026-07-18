import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  action,
  description,
  title,
}: {
  action?: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="grid min-h-40 place-items-center rounded-lg border border-dashed border-neutral-200 bg-white p-6 text-center">
      <div className="grid justify-items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-neutral-100 text-neutral-500">
          <Inbox aria-hidden="true" size={18} />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-neutral-950">{title}</h3>
          <p className="mt-1 max-w-sm text-xs leading-5 text-neutral-500">{description}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  );
}