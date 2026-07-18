import { Filter, LayoutGrid, List, Plus, SortAsc } from "lucide-react";
import type { Deal, PipelineColumnData } from "../../types/deals";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { PipelineColumn } from "./PipelineColumn";

type KanbanBoardProps = {
  columns: PipelineColumnData[];
  deals: Deal[];
};

export function KanbanBoard({ columns, deals }: KanbanBoardProps) {
  return (
    <section className="board-section" aria-label="Pipeline de operaciones">
      <div className="board-toolbar">
        <div className="board-toolbar__left">
          <Button icon={Plus}>New Deals</Button>
          <IconButton icon={LayoutGrid} label="Vista tablero" />
          <IconButton icon={List} label="Vista lista" />
        </div>
        <div className="board-toolbar__right">
          <Button icon={SortAsc}>Sort</Button>
          <Button icon={Filter}>Filter</Button>
        </div>
      </div>
      <div className="kanban">
        {columns.map((column) => (
          <PipelineColumn
            column={column}
            deals={deals.filter((deal) => deal.stage === column.id)}
            key={column.id}
          />
        ))}
      </div>
    </section>
  );
}
