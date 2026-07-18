import { deals, pipelineColumns, stats } from "../../data/deals";
import { DashboardHeader } from "./DashboardHeader";
import { KanbanBoard } from "./KanbanBoard";
import { MetricsRow } from "./MetricsRow";

export function DealsPipelinePage() {
  return (
    <>
      <DashboardHeader />
      <MetricsRow groups={stats} />
      <KanbanBoard columns={pipelineColumns} deals={deals} />
    </>
  );
}