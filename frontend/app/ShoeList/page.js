"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "../Header";
import { Footer } from "../Footer";

export default function ShoeListPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  /* ================================================== */

  /* ================= SEARCH ================= */
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(lowercaseQuery)
    );

    setSearchResults(results);
  };
  /* ========================================== */

  const displayProducts = searchQuery ? searchResults : products;

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to cart");
      router.push("/SignIn");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add item");
      }

      alert("Item added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong");
    }
  };
  /* ================================================ */

  return (
    <>
      <Header onSearch={handleSearch} />

      <section className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            {searchQuery
              ? `Search results for “${searchQuery}”`
              : "All Products"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={`http://localhost:5000${product.images?.[0]}`}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* INFO */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    <Link href={`/ShoeList/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {product.brand}
                  </p>

                  <p className="text-lg font-bold text-slate-900 mt-3">
                    ₹{product.price}
                  </p>

                  {/* ACTIONS */}
                  <div className="mt-4 flex flex-col gap-2">
                    <Link href={`/ShoeList/${product._id}`}>
                      <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                        View Product
                      </button>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="w-full py-2 rounded-lg border border-slate-300 text-slate-800 font-medium hover:bg-slate-100 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
