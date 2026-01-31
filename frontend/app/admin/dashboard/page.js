"use client";

import { useEffect, useState } from "react";
import StatCard from "../_components/StatCard";
import RevenueChart from "../_components/charts/RevenueChart";
import OrdersChart from "../_components/charts/OrdersChart";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setMetrics(data.metrics);
    };

    fetchMetrics();
  }, []);

  if (!metrics) return;

  return (
    <div className="space-y-8">
      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Users" value={metrics.totalUsers} />
        <StatCard title="Products" value={metrics.totalProducts} />
        <StatCard title="Orders" value={metrics.totalOrders} />
        <StatCard title="Revenue" value={`₹${metrics.totalRevenue}`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={metrics.revenueTrend} />
        <OrdersChart data={metrics.orderTrend} />
      </div>
    </div>
  );
}
