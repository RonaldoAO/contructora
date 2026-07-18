import { Ellipsis, Plus } from "lucide-react";
import type { CSSProperties } from "react";
import type { Deal, PipelineColumnData } from "../../types/deals";
import { IconButton } from "../ui/IconButton";
import { PropertyCard } from "./PropertyCard";

type PipelineColumnProps = {
  column: PipelineColumnData;
  deals: Deal[];
};

export function PipelineColumn({ column, deals }: PipelineColumnProps) {
  const style = { "--accent": column.accent } as CSSProperties;

  return (
    <article className="pipeline-column" style={style}>
      <header className="pipeline-column__header">
        <div>
          <span className="stage-dot" />
          <h2>
            {column.title} <small>{column.count}</small>
          </h2>
        </div>
        <div className="pipeline-column__actions">
          <IconButton icon={Plus} label={`Agregar a ${column.title}`} />
          <IconButton icon={Ellipsis} label={`Opciones de ${column.title}`} />
        </div>
      </header>
      <div className="pipeline-column__list">
        {deals.map((deal) => (
          <PropertyCard deal={deal} key={deal.id} />
        ))}
      </div>
    </article>
  );
}
