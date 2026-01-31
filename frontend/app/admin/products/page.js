"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "../_components/PageHeader";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setProducts(data.products || []);
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <PageHeader
        title="Products"
        action={
          <Link
            href="/admin/add-product"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5
              rounded-xl
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white font-semibold
              hover:opacity-90
              transition
            "
          >
            + Add Product
          </Link>
        }
      />

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
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Brand
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}

              {products.map((p, index) => (
                <tr
                  key={p._id}
                  className={`
                    transition
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-indigo-50
                  `}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {p.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {p.brand}
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    ₹{p.price}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full
                        text-xs font-semibold
                        ${
                          p.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {p.isActive ? "Active" : "Disabled"}
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
