import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SalesBar, SalesPoint } from "../../data/properties";

export function AnalyticsPanel({
  title,
  value,
  action,
  children,
}: {
  title: string;
  value: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="analytics-panel">
      <header className="analytics-panel__header">
        <div>
          <span>{title}</span>
          <strong>{value}</strong>
        </div>
        {action ? <div className="analytics-panel__action">{action}</div> : null}
      </header>
      <div className="analytics-panel__chart">{children}</div>
    </article>
  );
}

export function SalesTrendChart({ data }: { data: SalesPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: -22, right: 8, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="#ededeb" strokeDasharray="3 3" vertical={false} />
        <XAxis axisLine={false} dataKey="day" tick={{ fill: "#9da0a4", fontSize: 10 }} tickLine={false} />
        <YAxis axisLine={false} tick={{ fill: "#9da0a4", fontSize: 10 }} tickFormatter={(value) => `${Number(value) / 1000}m`} tickLine={false} />
        <Tooltip cursor={{ stroke: "#191a1b", strokeWidth: 1 }} />
        <Line dataKey="average" dot={false} isAnimationActive={false} stroke="#b9bbb8" strokeDasharray="3 3" strokeWidth={1.2} type="monotone" />
        <Line dataKey="previous" dot={false} isAnimationActive={false} stroke="#c9cbc8" strokeWidth={1.4} type="monotone" />
        <Line dataKey="current" dot={false} isAnimationActive={false} stroke="#2d3032" strokeWidth={1.6} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SalesBarsChart({ data }: { data: SalesBar[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart barGap={6} data={data} margin={{ left: -22, right: 8, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="#ededeb" strokeDasharray="3 3" vertical={false} />
        <XAxis axisLine={false} dataKey="month" tick={{ fill: "#9da0a4", fontSize: 10 }} tickLine={false} />
        <YAxis axisLine={false} tick={{ fill: "#9da0a4", fontSize: 10 }} tickLine={false} />
        <Tooltip cursor={{ fill: "rgba(20, 21, 22, 0.04)" }} />
        <Bar dataKey="current" fill="#535754" radius={[3, 3, 0, 0]} />
        <Bar dataKey="previous" fill="#d8d9d6" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}