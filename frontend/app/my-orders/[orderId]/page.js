"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { orderId } = params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= FETCH ORDER ================= */
  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setOrder(data.order);
    } catch (error) {
      console.error("Fetch order error:", error);
      localStorage.removeItem("token");
      router.replace("/SignIn");
    } finally {
      setLoading(false);
    }
  };
  /* =============================================== */

  useEffect(() => {
    if (!token) {
      router.replace("/SignIn");
      return;
    }

    fetchOrderDetails();
  }, []);
  /* =============================================== */

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-slate-600 animate-pulse">
          Loading order details...
        </p>
      </div>
    );
  }

  /* ================= SAFETY ================= */
  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-red-600">
          Order not found.
        </p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Order Details
          </h1>

          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
            {order.orderStatus}
          </span>
        </div>

        {/* ORDER INFO */}
        <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500">Order ID</p>
            <p className="font-medium text-slate-900">
              #{order._id}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Order Date</p>
            <p className="text-slate-700">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Payment Status</p>
            <p className="font-medium text-slate-900 capitalize">
              {order.paymentStatus}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Total Amount</p>
            <p className="text-xl font-bold text-slate-900">
              ₹{order.totalAmount}
            </p>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Delivery Address
          </h2>
          <p className="text-slate-700">
            <strong>{order.address.fullName}</strong>
            <br />
            {order.address.house}, {order.address.street}
            <br />
            {order.address.city}, {order.address.state} –{" "}
            {order.address.pincode}
            <br />
            {order.address.country}
            <br />
            Phone: {order.address.phone}
          </p>
        </div>

        {/* ITEMS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Ordered Items
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-6 items-center border p-4 rounded-lg"
              >
                <img
                  src={`http://localhost:5000${item.product.images[0]}`}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {item.product.name}
                  </h3>
                  <p className="text-slate-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-slate-500">
                    Price: ₹{item.priceAtPurchase}
                  </p>
                </div>

                <div className="text-lg font-bold text-slate-900">
                  ₹{item.priceAtPurchase * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BACK */}
        <button
          onClick={() => router.push("/my-orders")}
          className="text-indigo-600 font-semibold hover:underline"
        >
          ← Back to My Orders
        </button>
      </div>
    </div>
  );
}
