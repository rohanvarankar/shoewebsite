"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../Header";
import { Footer } from "../Footer";

export default function ShoeListPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 🔹 Fetch all products from backend
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

  // 🔹 Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(lowercaseQuery)
    );

    setSearchResults(results);
  };

  const displayProducts = searchQuery ? searchResults : products;

  return (
    <>
      <Header onSearch={handleSearch} />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "All Products"}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {displayProducts.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 group-hover:opacity-75">
                  <img
                    src={`http://localhost:5000${product.images?.[0]}`}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/ShoeList/${product._id}`}>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                </div>

                <Link href={`/ShoeList/${product._id}`}>
                  <button className="bg-blue-600 w-full text-white px-2 py-1 mt-2 rounded-md hover:bg-blue-700">
                    View Product
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
