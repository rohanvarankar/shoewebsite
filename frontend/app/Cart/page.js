"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 1️⃣ Must be logged in
    if (!token) {
      router.replace("/SignIn");
      return;
    }

    // 2️⃣ Fetch cart from backend
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

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

    fetchCart();
  }, [router]);

  // 3️⃣ Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  // 4️⃣ Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-4 border p-4 rounded"
          >
            {/* PRODUCT IMAGE */}
            <img
              src={`http://localhost:5000${item.product.images[0]}`}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />

            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h2 className="font-semibold">{item.product.name}</h2>
              <p className="text-gray-600">
                Price: ₹{item.product.price}
              </p>
              <p className="text-gray-600">
                Quantity: {item.quantity}
              </p>
            </div>

            {/* TOTAL */}
            <div className="font-bold">
              ₹{item.product.price * item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
