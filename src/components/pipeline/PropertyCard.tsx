import { CalendarDays, FileText, MessageSquare, UserRound } from "lucide-react";
import type { Deal, Priority } from "../../types/deals";
import { AvatarStack } from "../ui/AvatarStack";
import { Badge } from "../ui/Badge";
import { PropertyPreview } from "./PropertyPreview";

const priorityTone: Record<Priority, "low" | "medium" | "high"> = {
  Low: "low",
  Medium: "medium",
  High: "high",
};

export function PropertyCard({ deal }: { deal: Deal }) {
  return (
    <article className="property-card">
      <header className="property-card__meta">
        <span>{deal.id}</span>
        <Badge label={deal.priority} tone={priorityTone[deal.priority]} />
      </header>
      <PropertyPreview imageUrl={deal.imageUrl} label={deal.location} />
      <h3>{deal.title}</h3>
      <strong className="property-card__value">{deal.value}</strong>
      <dl className="deal-details">
        <div>
          <CalendarDays aria-hidden="true" size={13} />
          <dt>{deal.reservation}</dt>
          <dd>{deal.dueDate}</dd>
        </div>
        <div>
          <UserRound aria-hidden="true" size={13} />
          <dt>Client</dt>
          <dd>{deal.client}</dd>
        </div>
        <div>
          <FileText aria-hidden="true" size={13} />
          <dt>Source</dt>
          <dd>{deal.source}</dd>
        </div>
      </dl>
      <footer className="property-card__footer">
        <AvatarStack people={deal.initials} />
        <span>
          <MessageSquare aria-hidden="true" size={13} />
          {deal.comments} Comments
        </span>
        <span>
          <FileText aria-hidden="true" size={13} />
          {deal.files} Files
        </span>
      </footer>
    </article>
  );
}
