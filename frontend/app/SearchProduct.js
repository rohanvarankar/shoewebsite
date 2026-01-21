"use client";

import { useState } from "react";

export const SearchProduct = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* MODAL */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fadeIn">
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Search Products
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Find your perfect pair by name
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter product name..."
            autoFocus
            className="
              w-full px-4 py-3 mb-6
              border rounded-lg
              text-slate-800
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2 focus:ring-indigo-500
              transition
            "
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2
                rounded-lg
                text-slate-600
                hover:text-slate-800
                hover:bg-slate-100
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-6 py-2
                rounded-lg
                bg-indigo-600
                text-white
                font-medium
                hover:bg-indigo-700
                transition
                shadow-md
              "
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
