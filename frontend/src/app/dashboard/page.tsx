"use client"

import RecentChallenges from "@/components/recent-challanges";
import Welcome from "@/components/welcome";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

export default function Dashboard() {
  return (
    <div className="space-y-4 px-6 pt-6">
      <div className="flex items-center justify-between">
        <Welcome />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4">
        <DashboardCard type="completed" />
        <DashboardCard type="ongoing" />
        <DashboardCard type="open" />
      </div>
      <RecentChallenges />
    </div>
  );
}