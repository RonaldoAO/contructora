import {
  BarChart3,
  BellDot,
  Building2,
  CircleHelp,
  FileCheck2,
  FolderKanban,
  Link2,
  MessageSquare,
  Settings,
  Target,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { AppView, NavItem } from "../../types/deals";

const crmItems: NavItem[] = [
  { label: "Properties", icon: Building2, view: "properties" },
  { label: "Deals", icon: FolderKanban, view: "deals" },
  { label: "Leads", icon: Target, view: "leads" },
  { label: "Tasks", icon: FileCheck2, badge: "09+" },
  { label: "Contacts", icon: UserRound },
  { label: "Messages", icon: MessageSquare, badge: "3" },
];

const analyticsItems: NavItem[] = [
  { label: "Sales Analytics", icon: BarChart3, badge: "BETA" },
  { label: "Agent Performance", icon: UsersRound },
  { label: "Conversion Funnel", icon: Target },
];

const systemItems: NavItem[] = [
  { label: "Link Integration", icon: Link2 },
  { label: "Settings", icon: Settings },
  { label: "Help Center", icon: CircleHelp },
];

type NavGroupProps = {
  activeView: AppView;
  items: NavItem[];
  onViewChange: (view: AppView) => void;
  title: string;
};

function NavGroup({ activeView, items, onViewChange, title }: NavGroupProps) {
  return (
    <div className="nav-group">
      <p className="nav-group__title">{title}</p>
      <nav className="nav-list" aria-label={title}>
        {items.map((item) => {
          const isActive = item.view === activeView;
          const isInteractive = Boolean(item.view);

          return (
            <button
              aria-current={isActive ? "page" : undefined}
              className={`nav-item${isActive ? " nav-item--active" : ""}`}
              disabled={!isInteractive}
              key={item.label}
              onClick={() => {
                if (item.view) {
                  onViewChange(item.view);
                }
              }}
              type="button"
            >
              <item.icon aria-hidden="true" size={14} strokeWidth={2} />
              <span>{item.label}</span>
              {item.badge ? <strong>{item.badge}</strong> : null}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

type SidebarProps = {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
};

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="brand-mark">B</span>
        <div className="profile-chip">
          <span className="profile-chip__avatar">KA</span>
          <span>Keyvan Akath</span>
        </div>
        <BellDot aria-hidden="true" size={14} />
      </div>
      <NavGroup
        activeView={activeView}
        items={crmItems}
        onViewChange={onViewChange}
        title="CRM"
      />
      <NavGroup
        activeView={activeView}
        items={analyticsItems}
        onViewChange={onViewChange}
        title="Analytics"
      />
      <div className="sidebar__footer">
        <NavGroup
          activeView={activeView}
          items={systemItems}
          onViewChange={onViewChange}
          title="System Settings"
        />
        <div className="integration-stack" aria-label="Integraciones activas">
          <span className="integration integration--blue">G</span>
          <span className="integration integration--green">S</span>
          <span className="integration integration--purple">M</span>
          <span className="integration integration--more">+2</span>
        </div>
      </div>
    </aside>
  );
}