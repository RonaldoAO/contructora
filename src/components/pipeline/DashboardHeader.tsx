import { Plus } from "lucide-react";
import { AvatarStack } from "../ui/AvatarStack";
import { Button } from "../ui/Button";

export function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <h1>Deals pipeline</h1>
      <div className="dashboard-header__actions">
        <AvatarStack people={["KA", "NO", "AM"]} extra={2} />
        <Button icon={Plus}>Invite Member</Button>
      </div>
    </div>
  );
}