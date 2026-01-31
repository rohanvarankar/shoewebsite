"use client";

import { useEffect, useState } from "react";

import DashboardStats from "../_components/DashboardStats";
import RevenueChart from "../_components/RevenueChart";
import OrderStatusChart from "../_components/OrderStatusChart";
import RecentOrders from "../_components/RecentOrders";
import AIInsights from "../_components/AIInsights";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/admin/analytics/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch analytics");

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!dashboardData) return <p className="p-4">No data</p>;

  return (
    <div className="space-y-6">
      <DashboardStats stats={dashboardData.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={dashboardData.last7DaysRevenue} />
        <OrderStatusChart data={dashboardData.ordersByStatus} />
      </div>

      <RecentOrders orders={dashboardData.recentOrders} />

      <AIInsights insights={dashboardData.advancedInsights} />
    </div>
  );
}
