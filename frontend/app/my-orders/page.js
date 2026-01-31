"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= FETCH MY ORDERS ================= */
  const fetchMyOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Fetch orders error:", error);
      localStorage.removeItem("token");
      router.replace("/SignIn");
    } finally {
      setLoading(false);
    }
  };
  /* =================================================== */

  useEffect(() => {
    if (!token) {
      router.replace("/SignIn");
      return;
    }

    fetchMyOrders();
  }, []);
  /* =================================================== */

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-slate-600 animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          My Orders
        </h1>
        <p className="text-slate-600 mb-6">
          You haven’t placed any orders yet.
        </p>
        <button
          onClick={() => router.push("/ShoeList")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  /* ================= ORDERS LIST ================= */
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* LEFT */}
                <div>
                  <p className="text-sm text-slate-500">
                    Order ID
                  </p>
                  <p className="font-medium text-slate-900">
                    #{order._id.slice(-6)}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    Order Date
                  </p>
                  <p className="text-slate-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* CENTER */}
                <div>
                  <p className="text-sm text-slate-500">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    ₹{order.totalAmount}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                    {order.orderStatus}
                  </span>

                  <button
                    onClick={() =>
                      router.push(`/my-orders/${order._id}`)
                    }
                    className="block mt-4 text-indigo-600 font-semibold hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
