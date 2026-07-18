import { Grid3X3, SlidersHorizontal } from "lucide-react";
import {
  advertisements,
  kpiStats,
  realtors,
  salesBars,
  salesTrend,
} from "../../data/properties";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { ActiveAdvertisements } from "./ActiveAdvertisements";
import { AnalyticsPanel, SalesBarsChart, SalesTrendChart } from "./AnalyticsPanel";
import { PropertyStatCard } from "./PropertyStatCard";
import { RealtorEfficiency } from "./RealtorEfficiency";

export function PropertiesDashboard() {
  return (
    <div className="properties-dashboard">
      <header className="properties-dashboard__header">
        <div>
          <h1>Properties</h1>
          <p>Sales overview, active listings and realtor performance</p>
        </div>
        <div className="properties-dashboard__actions">
          <Button icon={Grid3X3}>Manage widgets</Button>
          <IconButton icon={SlidersHorizontal} label="Dashboard settings" />
        </div>
      </header>

      <section className="property-stats-grid" aria-label="Property statistics">
        {kpiStats.map((stat) => (
          <PropertyStatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <section className="property-charts-grid" aria-label="Property charts">
        <AnalyticsPanel
          action={<Button>Month</Button>}
          title="Total sales"
          value="$1,652,850"
        >
          <SalesTrendChart data={salesTrend} />
        </AnalyticsPanel>
        <AnalyticsPanel
          action={<Button>Year</Button>}
          title="Number of sales"
          value="24"
        >
          <SalesBarsChart data={salesBars} />
        </AnalyticsPanel>
      </section>

      <section className="property-bottom-grid">
        <ActiveAdvertisements items={advertisements} />
        <RealtorEfficiency realtors={realtors} />
      </section>
    </div>
  );
}