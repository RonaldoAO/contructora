import { Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BudgetMonth } from "../../data/progress";

export function BudgetAccumulator({ data }: { data: BudgetMonth[] }) {
  return (
    <article className="budget-panel panel-card">
      <header className="section-heading section-heading--compact">
        <div>
          <h2>Presupuesto mensual</h2>
          <p>Planeado, real y acumulado</p>
        </div>
        <span className="budget-total">$4.82M</span>
      </header>
      <div className="budget-panel__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -18, right: 8, top: 6, bottom: 0 }}>
            <CartesianGrid stroke="#ededeb" strokeDasharray="3 3" vertical={false} />
            <XAxis axisLine={false} dataKey="month" tick={{ fill: "#8d9296", fontSize: 10 }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: "#8d9296", fontSize: 10 }} tickFormatter={(value) => `$${Number(value) / 1000000}M`} tickLine={false} />
            <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} cursor={{ fill: "rgba(20, 21, 22, 0.04)" }} />
            <Bar dataKey="planned" fill="#d8d9d6" name="Planeado" radius={[3, 3, 0, 0]} />
            <Bar dataKey="actual" fill="#565b58" name="Real" radius={[3, 3, 0, 0]} />
            <Line dataKey="accumulated" dot={false} name="Acumulado" stroke="#11a46d" strokeWidth={2} type="monotone" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}