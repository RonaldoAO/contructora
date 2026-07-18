import type { Deal, MetricGroup, PipelineColumnData } from "../types/deals";

export const stats: MetricGroup[] = [
  {
    title: "Pipeline Value",
    metrics: [
      {
        label: "Total Asset Volume",
        value: "24.5M AED",
        delta: "14% vs last month",
        tone: "positive",
      },
      {
        label: "Commission",
        value: "490K AED",
        delta: "5% vs last month",
        tone: "positive",
      },
    ],
  },
  {
    title: "Deal Activity",
    metrics: [
      {
        label: "Viewings Booked",
        value: "20",
        delta: "12% vs last month",
        tone: "positive",
      },
      {
        label: "Offers Sent",
        value: "5",
        delta: "20% vs last month",
        tone: "warning",
      },
    ],
  },
  {
    title: "Conversion & Speed",
    metrics: [
      {
        label: "Avg. Days to Close",
        value: "42",
        delta: "5% vs last month",
        tone: "warning",
      },
      {
        label: "Win Rate",
        value: "12%",
        delta: "2% vs last month",
        tone: "positive",
      },
    ],
  },
];

export const pipelineColumns: PipelineColumnData[] = [
  { id: "new", title: "New", count: 14, accent: "#b978f7" },
  { id: "viewing", title: "Viewing Scheduled", count: 1, accent: "#f5a623" },
  { id: "negotiation", title: "Negotiation", count: 6, accent: "#61bdf2" },
  { id: "legal", title: "Legal & Documentation", count: 1, accent: "#4fcf91" },
];

export const deals: Deal[] = [
  {
    id: "#DXB-04219",
    stage: "new",
    priority: "Low",
    title: "3-bedrooms in UAE - Terrace & Garden - Apartment, 195 m2",
    location: "Al Wasl",
    value: "2,450,000 AED",
    reservation: "Reservation",
    client: "James O'Connor",
    source: "bronex.com",
    dueDate: "25 Nov 2025",
    owner: "B",
    comments: 3,
    files: 1,
    initials: ["B", "K"],
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "#DXB-04217",
    stage: "viewing",
    priority: "Medium",
    title: "1-bedroom in UAE - Exclusive Suite with Infinity Pool - 85 m2",
    location: "Dubai Marina",
    value: "2,650,000 AED",
    reservation: "Pending",
    client: "Amira Al-Fayed",
    source: "vacationhomes.ca",
    dueDate: "21 Nov 2025",
    owner: "J",
    comments: 12,
    files: 6,
    initials: ["J", "R"],
    imageUrl:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "#DXB-04208",
    stage: "negotiation",
    priority: "Low",
    title: "3-bedrooms in UAE - Terrace & Sea View - Apartment, 120 m2",
    location: "Palm Jumeirah",
    value: "3,200,000 AED",
    reservation: "Reservation",
    client: "Wei Chen",
    source: "bronex.com",
    dueDate: "22 Nov 2025",
    owner: "K",
    comments: 23,
    files: 10,
    initials: ["B", "R", "K"],
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "#DXB-04207",
    stage: "legal",
    priority: "High",
    title: "2-bedrooms in UAE - Avani Palm - High Floor & Serviced - 90 m2",
    location: "Business Bay",
    value: "920,000 AED",
    reservation: "Reservation",
    client: "Vikram Malhotra",
    source: "bronex.com",
    dueDate: "30 Nov 2025",
    owner: "L",
    comments: 34,
    files: 12,
    initials: ["J", "B", "K"],
    imageUrl:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "#DXB-04220",
    stage: "new",
    priority: "Low",
    title: "4-bedrooms in UAE - Private Villa - Garden Suite, 245 m2",
    location: "Jumeirah Golf Estates",
    value: "5,850,000 AED",
    reservation: "Draft",
    client: "Nora Haddad",
    source: "direct",
    dueDate: "03 Dec 2025",
    owner: "M",
    comments: 8,
    files: 4,
    initials: ["M", "B"],
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "#DXB-04209",
    stage: "negotiation",
    priority: "Low",
    title: "3-bedrooms in UAE - Bright Villa - Family Community, 180 m2",
    location: "Arabian Ranches",
    value: "4,100,000 AED",
    reservation: "Offer sent",
    client: "Layla Khan",
    source: "referral",
    dueDate: "27 Nov 2025",
    owner: "R",
    comments: 16,
    files: 8,
    initials: ["R", "K"],
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=520&q=80",
  },
];
