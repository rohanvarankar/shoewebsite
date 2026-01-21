"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ================= FETCH CART ================= */
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
    } catch (error) {
      console.error("Cart fetch error:", error);
      localStorage.removeItem("token");
      router.replace("/SignIn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.replace("/SignIn");
      return;
    }
    fetchCart();
  }, []);
  /* ============================================= */

  /* ================= INCREASE QTY ================= */
  const increaseQty = async (productId) => {
    try {
      await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      fetchCart();
    } catch (err) {
      console.error("Increase qty error", err);
    }
  };
  /* =============================================== */

  /* ================= DECREASE QTY ================= */
  const decreaseQty = async (productId, quantity) => {
    if (quantity <= 1) return;

    // simple local decrement (backend doesn't support decrement yet)
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  /* =============================================== */

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (productId) => {
    try {
      await fetch(
        `http://localhost:5000/api/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.error("Remove item error", err);
    }
  };
  /* =============================================== */

  /* ================= TOTAL ================= */
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  /* ======================================== */

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-slate-600 animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  /* ================= EMPTY CART ================= */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Your Cart
        </h1>
        <p className="text-slate-600 mb-6">
          Your cart is currently empty.
        </p>
        <button
          onClick={() => router.push("/ShoeList")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Browse Shoes
        </button>
      </div>
    );
  }

  /* ================= CART UI ================= */
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT - ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Your Cart
          </h1>

          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row gap-6 items-center bg-white p-6 rounded-xl shadow"
            >
              {/* IMAGE */}
              <img
                src={`http://localhost:5000${item.product.images[0]}`}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded-lg border"
              />

              {/* INFO */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-900">
                  {item.product.name}
                </h2>
                <p className="text-slate-500">
                  ₹{item.product.price}
                </p>

                {/* QTY CONTROLS */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      decreaseQty(
                        item.product._id,
                        item.quantity
                      )
                    }
                    className="p-2 border rounded hover:bg-slate-100"
                  >
                    <FaMinus size={12} />
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.product._id)
                    }
                    className="p-2 border rounded hover:bg-slate-100"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              {/* TOTAL + REMOVE */}
              <div className="text-right space-y-3">
                <p className="text-lg font-bold text-slate-900">
                  ₹{item.product.price * item.quantity}
                </p>

                <button
                  onClick={() =>
                    removeItem(item.product._id)
                  }
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                >
                  <FaTrash size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-slate-600 mb-3">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
