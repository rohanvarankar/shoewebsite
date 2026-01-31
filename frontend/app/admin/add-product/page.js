"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);

      // ✅ FIX: SEND SIZES AS JSON STRING
      formData.append(
        "sizes",
        JSON.stringify(
          sizes.split(",").map((s) => Number(s.trim()))
        )
      );

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      alert("✅ Product added successfully!");

      setName("");
      setBrand("");
      setPrice("");
      setSizes("");
      setStock("");
      setImages([]);
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Shoe
          </h1>
          <p className="text-slate-500 mt-2">
            Fill in the details to add a new product to the store
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Shoe Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Sizes
            </label>
            <input
              type="text"
              placeholder="e.g. 7,8,9"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="w-full px-3 py-2 border rounded-lg bg-slate-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
