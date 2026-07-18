import type { LucideIcon } from "lucide-react";

export type AppView = "properties" | "deals" | "leads";

export type TrendTone = "positive" | "warning" | "neutral";
export type Priority = "Low" | "Medium" | "High";
export type DealStage = "new" | "viewing" | "negotiation" | "legal";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
  view?: AppView;
};

export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: TrendTone;
};

export type MetricGroup = {
  title: string;
  metrics: Metric[];
};

export type PipelineColumnData = {
  id: DealStage;
  title: string;
  count: number;
  accent: string;
};

export type Deal = {
  id: string;
  stage: DealStage;
  priority: Priority;
  title: string;
  location: string;
  value: string;
  reservation: string;
  client: string;
  source: string;
  dueDate: string;
  owner: string;
  comments: number;
  files: number;
  initials: string[];
  imageUrl: string;
};
