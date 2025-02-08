import MetricsCard from "@/components/dashboard/metric-card";
import RecentChallenges from "@/components/recent-challanges";
import Welcome from "@/components/welcome"

export default function AdminDashboard() {
  return (
    <div className="space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between">
        <Welcome hideProfileButton />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">
        <MetricsCard type="total" />
        <MetricsCard type="participants" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">
        <MetricsCard type="open" />
        <MetricsCard type="ongoing" />
        <MetricsCard type="completed" />
      </div>
      <RecentChallenges />
    </div>
  );
}
