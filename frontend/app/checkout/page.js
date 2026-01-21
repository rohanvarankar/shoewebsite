"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= FETCH CART ================= */
  useEffect(() => {
    if (!token) {
      router.replace("/SignIn");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setCartItems(data.items || []);

        const total = (data.items || []).reduce(
          (sum, item) =>
            sum + item.product.price * item.quantity,
          0
        );
        setTotalAmount(total);
      } catch (err) {
        console.error("Checkout cart error", err);
        router.replace("/SignIn");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);
  /* ============================================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    const allFilled = Object.values(form).every(
      (v) => v.trim() !== ""
    );

    if (!allFilled) {
      alert("Please fill all delivery details");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Order failed");
      }

      alert("Order placed successfully!");
      router.push("/"); // later → payment page
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };
  /* ============================================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 animate-pulse">
          Preparing checkout…
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT — DELIVERY */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow space-y-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Delivery Information
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="input" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
            <input name="phone" placeholder="Mobile Number" value={form.phone} onChange={handleChange} className="input sm:col-span-2" />
            <input name="house" placeholder="House / Flat" value={form.house} onChange={handleChange} className="input sm:col-span-2" />
            <input name="street" placeholder="Street / Area" value={form.street} onChange={handleChange} className="input sm:col-span-2" />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="input" />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="input" />
            <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="input sm:col-span-2" />
          </div>

          {/* FUTURE READY */}
          <p className="text-xs text-slate-500">
            📱 Phone verification & location auto-fill will be added at payment step.
          </p>
        </div>

        {/* RIGHT — SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-slate-600 mb-3">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={submitting}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {submitting ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </div>

      {/* Tailwind helper */}
      <style jsx>{`
        .input {
          border: 1px solid #e2e8f0;
          padding: 12px;
          border-radius: 8px;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
        }
      `}</style>
    </div>
  );
}
