import { Eye, MapPin, Pencil, Plus, TrendingUp } from "lucide-react";
import type { Advertisement } from "../../data/properties";
import { Button } from "../ui/Button";

export function ActiveAdvertisements({ items }: { items: Advertisement[] }) {
  return (
    <article className="active-ads panel-card">
      <header className="section-heading">
        <div>
          <h2>Active advertisements</h2>
          <div className="segmented-tabs" aria-label="Advertisement filters">
            <button className="segmented-tabs__item segmented-tabs__item--active" type="button">All 117</button>
            <button className="segmented-tabs__item" type="button">Sale 85</button>
            <button className="segmented-tabs__item" type="button">Rent 32</button>
          </div>
        </div>
        <Button icon={Plus} variant="primary">New</Button>
      </header>
      <div className="active-ads__list">
        {items.map((item) => (
          <div className="ad-row" key={item.id}>
            <img src={item.imageUrl} alt={item.title} loading="lazy" />
            <div className="ad-row__main">
              <span>{item.id}</span>
              <strong>{item.price}</strong>
              <p>{item.details}</p>
              <small>
                <MapPin aria-hidden="true" size={13} />
                {item.location}
              </small>
            </div>
            <div className="ad-row__status">
              <strong>{item.status}</strong>
              <span>{item.listedAt}</span>
              <Button icon={TrendingUp}>Boost</Button>
            </div>
            <div className="ad-row__spark" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, index) => (
                <span key={index} style={{ height: `${18 + ((index * 13) % 34)}px` }} />
              ))}
            </div>
            <div className="ad-row__actions">
              <Button icon={Pencil} variant="ghost">Edit</Button>
              <span>
                <Eye aria-hidden="true" size={13} />
                {item.views}
              </span>
              <small>{item.growth}</small>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}