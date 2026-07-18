import { ArrowUpRight } from "lucide-react";
import {
  Cell,
  Line,
  LineChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import type { KpiStat } from "../../data/properties";
import { Button } from "../ui/Button";

type PropertyStatCardProps = {
  stat: KpiStat;
};

export function PropertyStatCard({ stat }: PropertyStatCardProps) {
  const scoreValue = Number(stat.value);
  const scoreData = [{ name: stat.title, value: scoreValue }];

  return (
    <article className="property-stat-card">
      <div className="property-stat-card__body">
        <div>
          <span className="property-stat-card__label">{stat.title}</span>
          <strong>
            {stat.value}
            {stat.suffix ? <small>{stat.suffix}</small> : null}
          </strong>
        </div>
        <div className="property-stat-card__chart" aria-hidden="true">
          {stat.variant === "score" ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={scoreData}
                endAngle={-45}
                innerRadius="72%"
                outerRadius="100%"
                startAngle={210}
              >
                <RadialBar dataKey="value" cornerRadius={8} background>
                  <Cell fill="#12b886" />
                </RadialBar>
              </RadialBarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stat.sparkline} margin={{ left: 2, right: 2 }}>
                <Line
                  dataKey="value"
                  dot={false}
                  isAnimationActive={false}
                  stroke="#202326"
                  strokeWidth={1.6}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <footer className="property-stat-card__footer">
        <span className={`trend trend--${stat.tone}`}>{stat.delta}</span>
        <Button className="property-stat-card__link" icon={ArrowUpRight} variant="ghost">
          Show more
        </Button>
      </footer>
    </article>
  );
}