export type ProgressStatus = "on-track" | "late" | "risk" | "pending";
export type ActivityStatus = "not_started" | "ready" | "in_progress" | "blocked" | "completed";
export type ProgressReviewStatus = "pending" | "approved" | "observed" | "rejected";
export type EvidenceKind = "photo" | "gallery" | "document" | "audio";

export type EvidenceAsset = {
  id: string;
  kind: EvidenceKind;
  name: string;
  status: "pending" | "uploading" | "processing" | "ready" | "error";
  uploadedBy: string;
};

export type ProgressDay = {
  id: string;
  day: number;
  weekday: string;
  deliverable: string;
  planned: number;
  actual: number;
  budget: number;
  status: ProgressStatus;
  owner: string;
};

export type WorkActivity = {
  id: string;
  activity: string;
  trade: string;
  locationPath: string[];
  contractor: string;
  quantity: string;
  budgetedCost: number;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
  plannedProgress: number;
  actualProgress: number;
  status: ProgressStatus;
  activityStatus: ActivityStatus;
  responsible: string;
  approvedProgress: number;
  reportedProgress: number;
  reviewStatus: ProgressReviewStatus;
  blocker?: string;
};

export type TimelineDay = {
  date: string;
  day: number;
  month: string;
  weekday: string;
  isToday?: boolean;
};

export type BudgetMonth = {
  month: string;
  planned: number;
  actual: number;
  accumulated: number;
};

export type ProgressKpi = {
  label: string;
  value: string;
  detail: string;
  tone: "positive" | "warning" | "danger" | "neutral";
};

export const progressKpis: ProgressKpi[] = [
  { label: "Actividades planeadas", value: "18", detail: "Jul 13 - Ago 04", tone: "neutral" },
  { label: "Avance aprobado", value: "59%", detail: "9 pts debajo del plan", tone: "warning" },
  { label: "Pendientes de aprobacion", value: "6", detail: "3 con observaciones", tone: "danger" },
  { label: "Presupuesto acumulado", value: "$4.8M", detail: "+$840K este mes", tone: "positive" }
];

export const timelineDays: TimelineDay[] = [
  { date: "2026-07-13", day: 13, month: "Jul", weekday: "Lun" },
  { date: "2026-07-14", day: 14, month: "Jul", weekday: "Mar" },
  { date: "2026-07-15", day: 15, month: "Jul", weekday: "Mie" },
  { date: "2026-07-16", day: 16, month: "Jul", weekday: "Jue" },
  { date: "2026-07-17", day: 17, month: "Jul", weekday: "Vie" },
  { date: "2026-07-18", day: 18, month: "Jul", weekday: "Sab", isToday: true },
  { date: "2026-07-19", day: 19, month: "Jul", weekday: "Dom" },
  { date: "2026-07-20", day: 20, month: "Jul", weekday: "Lun" },
  { date: "2026-07-21", day: 21, month: "Jul", weekday: "Mar" },
  { date: "2026-07-22", day: 22, month: "Jul", weekday: "Mie" },
  { date: "2026-07-23", day: 23, month: "Jul", weekday: "Jue" },
  { date: "2026-07-24", day: 24, month: "Jul", weekday: "Vie" },
  { date: "2026-07-25", day: 25, month: "Jul", weekday: "Sab" },
  { date: "2026-07-26", day: 26, month: "Jul", weekday: "Dom" },
  { date: "2026-07-27", day: 27, month: "Jul", weekday: "Lun" },
  { date: "2026-07-28", day: 28, month: "Jul", weekday: "Mar" },
  { date: "2026-07-29", day: 29, month: "Jul", weekday: "Mie" },
  { date: "2026-07-30", day: 30, month: "Jul", weekday: "Jue" },
  { date: "2026-07-31", day: 31, month: "Jul", weekday: "Vie" },
  { date: "2026-08-01", day: 1, month: "Ago", weekday: "Sab" },
  { date: "2026-08-02", day: 2, month: "Ago", weekday: "Dom" },
  { date: "2026-08-03", day: 3, month: "Ago", weekday: "Lun" },
  { date: "2026-08-04", day: 4, month: "Ago", weekday: "Mar" }
];

export const workActivities: WorkActivity[] = [
  {
    id: "act-ceramic-301",
    activity: "Instalacion de piso ceramico",
    trade: "6.1 Pisos",
    locationPath: ["Proyecto Torre Ambar", "Torre A", "Nivel 3", "Departamento 301"],
    contractor: "Acabados Lopez",
    quantity: "40 m2",
    budgetedCost: 28000,
    plannedStart: "2026-07-13",
    plannedEnd: "2026-07-18",
    actualStart: "2026-07-14",
    actualEnd: "2026-07-21",
    plannedProgress: 100,
    actualProgress: 72,
    status: "late",
    activityStatus: "in_progress",
    responsible: "Residente Soto",
    approvedProgress: 64,
    reportedProgress: 72,
    reviewStatus: "pending",
    blocker: "Faltan 12 cajas de boquilla gris"
  },
  {
    id: "act-kitchen-301",
    activity: "Colocacion de cocina integral",
    trade: "7.3 Carpinteria",
    locationPath: ["Proyecto Torre Ambar", "Torre A", "Nivel 3", "Departamento 301", "Cocina"],
    contractor: "Muebles Delta",
    quantity: "1 lote",
    budgetedCost: 64000,
    plannedStart: "2026-07-19",
    plannedEnd: "2026-07-24",
    actualStart: "2026-07-21",
    actualEnd: "2026-07-26",
    plannedProgress: 60,
    actualProgress: 36,
    status: "risk",
    activityStatus: "blocked",
    responsible: "Arq. Medina",
    approvedProgress: 31,
    reportedProgress: 36,
    reviewStatus: "observed",
    blocker: "Cliente no ha liberado tono final de cubierta"
  },
  {
    id: "act-bath-301",
    activity: "Instalacion de muebles de bano",
    trade: "6.4 Banos",
    locationPath: ["Proyecto Torre Ambar", "Torre A", "Nivel 3", "Departamento 301", "Bano"],
    contractor: "Sanitarios Ruiz",
    quantity: "2 piezas",
    budgetedCost: 18500,
    plannedStart: "2026-07-22",
    plannedEnd: "2026-07-27",
    actualStart: "2026-07-24",
    actualEnd: "2026-07-30",
    plannedProgress: 45,
    actualProgress: 21,
    status: "risk",
    activityStatus: "in_progress",
    responsible: "Ing. Nunez",
    approvedProgress: 18,
    reportedProgress: 21,
    reviewStatus: "pending",
    blocker: "Proveedor reagendo entrega de accesorios"
  },
  {
    id: "act-paint-302",
    activity: "Pintura vinilica interior",
    trade: "8.1 Pintura",
    locationPath: ["Proyecto Torre Ambar", "Torre A", "Nivel 3", "Departamento 302"],
    contractor: "Pinturas Norte",
    quantity: "168 m2",
    budgetedCost: 33600,
    plannedStart: "2026-07-15",
    plannedEnd: "2026-07-22",
    actualStart: "2026-07-15",
    actualEnd: "2026-07-23",
    plannedProgress: 85,
    actualProgress: 78,
    status: "late",
    activityStatus: "in_progress",
    responsible: "Residente Soto",
    approvedProgress: 74,
    reportedProgress: 78,
    reviewStatus: "pending"
  },
  {
    id: "act-level2-waterproof",
    activity: "Impermeabilizacion de losa",
    trade: "5.2 Impermeabilizantes",
    locationPath: ["Proyecto Torre Ambar", "Torre A", "Nivel 2"],
    contractor: "Sellos MX",
    quantity: "220 m2",
    budgetedCost: 57200,
    plannedStart: "2026-07-20",
    plannedEnd: "2026-07-26",
    actualStart: "2026-07-20",
    actualEnd: "2026-07-26",
    plannedProgress: 100,
    actualProgress: 100,
    status: "on-track",
    activityStatus: "completed",
    responsible: "Supervisor QA",
    approvedProgress: 100,
    reportedProgress: 100,
    reviewStatus: "approved"
  },
  {
    id: "act-roof-equipment",
    activity: "Montaje de equipos HVAC",
    trade: "9.5 HVAC",
    locationPath: ["Proyecto Torre Ambar", "Torre A", "Azotea"],
    contractor: "Clima Proyectos",
    quantity: "4 equipos",
    budgetedCost: 184000,
    plannedStart: "2026-07-27",
    plannedEnd: "2026-08-04",
    actualStart: "2026-07-29",
    actualEnd: "2026-08-04",
    plannedProgress: 25,
    actualProgress: 0,
    status: "pending",
    activityStatus: "ready",
    responsible: "Clima Proyectos",
    approvedProgress: 0,
    reportedProgress: 0,
    reviewStatus: "pending"
  },
  {
    id: "act-lobby-stone",
    activity: "Recubrimiento de piedra lobby",
    trade: "6.2 Recubrimientos",
    locationPath: ["Proyecto Torre Ambar", "Torre B", "Nivel 1", "Lobby"],
    contractor: "Cantera Studio",
    quantity: "54 m2",
    budgetedCost: 89100,
    plannedStart: "2026-07-16",
    plannedEnd: "2026-07-25",
    actualStart: "2026-07-17",
    actualEnd: "2026-07-28",
    plannedProgress: 68,
    actualProgress: 44,
    status: "risk",
    activityStatus: "blocked",
    responsible: "Arq. Rivas",
    approvedProgress: 38,
    reportedProgress: 44,
    reviewStatus: "observed",
    blocker: "Muestra de cantera rechazada por supervision"
  },
  {
    id: "act-parking-lines",
    activity: "Senalizacion de estacionamiento",
    trade: "10.1 Senaletica",
    locationPath: ["Proyecto Torre Ambar", "Estacionamiento S1"],
    contractor: "Urban Mark",
    quantity: "96 cajones",
    budgetedCost: 42000,
    plannedStart: "2026-07-23",
    plannedEnd: "2026-07-29",
    actualStart: "2026-07-23",
    actualEnd: "2026-07-31",
    plannedProgress: 35,
    actualProgress: 18,
    status: "late",
    activityStatus: "in_progress",
    responsible: "Urban Mark",
    approvedProgress: 12,
    reportedProgress: 18,
    reviewStatus: "pending",
    blocker: "Frente parcialmente ocupado por material"
  }
];

export const progressDays: ProgressDay[] = [
  { id: "day-01", day: 1, weekday: "Lun", deliverable: "Trazo y nivelacion", planned: 8, actual: 8, budget: 180000, status: "on-track", owner: "QA" },
  { id: "day-02", day: 2, weekday: "Mar", deliverable: "Excavacion eje A", planned: 14, actual: 12, budget: 210000, status: "late", owner: "OB" }
];

export const budgetMonths: BudgetMonth[] = [
  { month: "Ene", planned: 950000, actual: 920000, accumulated: 920000 },
  { month: "Feb", planned: 1180000, actual: 1240000, accumulated: 2160000 },
  { month: "Mar", planned: 1320000, actual: 1410000, accumulated: 3570000 },
  { month: "Abr", planned: 980000, actual: 840000, accumulated: 4410000 },
  { month: "May", planned: 890000, actual: 410000, accumulated: 4820000 },
  { month: "Jun", planned: 1040000, actual: 0, accumulated: 4820000 }
];