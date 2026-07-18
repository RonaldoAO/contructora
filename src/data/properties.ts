export type StatTone = "positive" | "neutral";

export type KpiStat = {
  title: string;
  value: string;
  suffix?: string;
  delta: string;
  tone: StatTone;
  variant: "score" | "sparkline";
  sparkline: Array<{ name: string; value: number }>;
};

export type SalesPoint = {
  day: string;
  current: number;
  previous: number;
  average: number;
};

export type SalesBar = {
  month: string;
  current: number;
  previous: number;
};

export type Advertisement = {
  id: string;
  title: string;
  price: string;
  details: string;
  location: string;
  status: string;
  listedAt: string;
  views: string;
  growth: string;
  imageUrl: string;
};

export type Realtor = {
  name: string;
  value: number;
  initials: string;
};

export const kpiStats: KpiStat[] = [
  {
    title: "Smart score",
    value: "82",
    suffix: "/100",
    delta: "18 last week",
    tone: "positive",
    variant: "score",
    sparkline: [
      { name: "A", value: 52 },
      { name: "B", value: 64 },
      { name: "C", value: 78 },
      { name: "D", value: 82 },
    ],
  },
  {
    title: "Number of sales",
    value: "24",
    delta: "20% last week",
    tone: "positive",
    variant: "sparkline",
    sparkline: [
      { name: "Mon", value: 12 },
      { name: "Tue", value: 17 },
      { name: "Wed", value: 14 },
      { name: "Thu", value: 22 },
      { name: "Fri", value: 16 },
      { name: "Sat", value: 24 },
    ],
  },
  {
    title: "Leads",
    value: "2,986",
    delta: "12% last week",
    tone: "positive",
    variant: "sparkline",
    sparkline: [
      { name: "Mon", value: 42 },
      { name: "Tue", value: 37 },
      { name: "Wed", value: 45 },
      { name: "Thu", value: 41 },
      { name: "Fri", value: 54 },
      { name: "Sat", value: 61 },
    ],
  },
  {
    title: "New clients",
    value: "19",
    delta: "34% last week",
    tone: "positive",
    variant: "sparkline",
    sparkline: [
      { name: "Mon", value: 8 },
      { name: "Tue", value: 11 },
      { name: "Wed", value: 9 },
      { name: "Thu", value: 6 },
      { name: "Fri", value: 17 },
      { name: "Sat", value: 19 },
    ],
  },
];

export const salesTrend: SalesPoint[] = [
  { day: "1", current: 970, previous: 760, average: 980 },
  { day: "3", current: 1120, previous: 810, average: 1010 },
  { day: "5", current: 1260, previous: 780, average: 1040 },
  { day: "7", current: 1080, previous: 840, average: 1070 },
  { day: "9", current: 1185, previous: 735, average: 1100 },
  { day: "11", current: 1410, previous: 920, average: 1130 },
  { day: "13", current: 1035, previous: 700, average: 1160 },
  { day: "15", current: 1180, previous: 850, average: 1190 },
  { day: "17", current: 930, previous: 780, average: 1220 },
  { day: "19", current: 1110, previous: 890, average: 1250 },
  { day: "21", current: 1460, previous: 1050, average: 1280 },
  { day: "23", current: 1330, previous: 990, average: 1310 },
  { day: "25", current: 1550, previous: 1160, average: 1340 },
  { day: "27", current: 1270, previous: 1080, average: 1370 },
  { day: "29", current: 1360, previous: 1220, average: 1400 },
];

export const salesBars: SalesBar[] = [
  { month: "Jan", current: 31, previous: 22 },
  { month: "Feb", current: 24, previous: 18 },
  { month: "Mar", current: 27, previous: 20 },
  { month: "Apr", current: 35, previous: 24 },
  { month: "May", current: 19, previous: 16 },
  { month: "Jun", current: 29, previous: 21 },
  { month: "Jul", current: 44, previous: 31 },
  { month: "Aug", current: 33, previous: 23 },
  { month: "Sep", current: 20, previous: 18 },
  { month: "Oct", current: 27, previous: 22 },
  { month: "Nov", current: 19, previous: 25 },
  { month: "Dec", current: 16, previous: 21 },
];

export const advertisements: Advertisement[] = [
  {
    id: "ADV-032",
    title: "4 beds - 3 baths - 233 m2",
    price: "$1,528,000",
    details: "4 beds - 3 ba - 233 m2",
    location: "Benevento, Italy",
    status: "Active 101 days",
    listedAt: "Jul 8, 2024",
    views: "1,317 Views",
    growth: "+31 today",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "ADV-041",
    title: "3 beds - 2 baths - 180 m2",
    price: "$920,000",
    details: "3 beds - 2 ba - 180 m2",
    location: "Valencia, Spain",
    status: "Active 64 days",
    listedAt: "Aug 12, 2024",
    views: "982 Views",
    growth: "+18 today",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=520&q=80",
  },
];

export const realtors: Realtor[] = [
  { name: "Ann Dokidis", value: 79.3, initials: "AD" },
  { name: "Anika Levin", value: 67.1, initials: "AL" },
  { name: "Kadin Bator", value: 48.4, initials: "KB" },
];