import type { Realtor } from "../../data/properties";
import { AvatarStack } from "../ui/AvatarStack";

export function RealtorEfficiency({ realtors }: { realtors: Realtor[] }) {
  return (
    <article className="realtor-efficiency panel-card">
      <header className="section-heading section-heading--compact">
        <h2>Realtor efficiency</h2>
        <div className="metric-toggle" aria-label="Metric display">
          <button className="metric-toggle__item" type="button">$</button>
          <button className="metric-toggle__item metric-toggle__item--active" type="button">%</button>
        </div>
      </header>
      <div className="realtor-efficiency__list">
        {realtors.map((realtor) => (
          <div className="realtor-row" key={realtor.name}>
            <AvatarStack people={[realtor.initials]} />
            <span>{realtor.name}</span>
            <div className="realtor-row__track">
              <span style={{ width: `${realtor.value}%` }} />
            </div>
            <strong>{realtor.value}%</strong>
          </div>
        ))}
      </div>
    </article>
  );
}