"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { TaskChart } from "@/components/dashboard/task-chart";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <AuthGuard>
      <div className="bg-muted/50">
        <div className="main-container py-8 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your{" "}
              {user?.role === "manager" ? "team" : "tasks"} today.
            </p>
          </div>

          <div className="space-y-8">
            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TaskChart />
              <RecentTasks />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
