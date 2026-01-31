"use client";

import { useEffect, useState } from "react";
import PageHeader from "../_components/PageHeader";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setOrders(data.orders || []);
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <PageHeader title="Orders" />

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* MOBILE HINT */}
        <div className="sm:hidden px-4 py-2 text-xs text-gray-500">
          Swipe horizontally to view more →
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse">
            {/* TABLE HEAD */}
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}

              {orders.map((o, index) => (
                <tr
                  key={o._id}
                  className={`
                    transition
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-indigo-50
                  `}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {o.user?.name || "Guest User"}
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    ₹{o.totalAmount}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full
                        text-xs font-semibold
                        ${
                          o.orderStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : o.orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
