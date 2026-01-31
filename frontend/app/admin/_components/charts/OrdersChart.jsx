"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 h-80">
      <h3 className="font-semibold mb-4">Orders Per Day</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
