"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
            bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            ☰
          </button>

          {/* Page Title (Desktop) */}
          <h1 className="hidden md:block text-lg font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        {/* CENTER SEARCH (HIDDEN ON SMALL DEVICES) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl
              bg-gray-100 focus:bg-white border border-transparent
              focus:border-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            className="relative w-10 h-10 flex items-center justify-center rounded-xl
            bg-gray-100 hover:bg-indigo-100 transition"
          >
            <Bell size={18} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br
              from-indigo-600 to-purple-600 flex items-center justify-center
              text-white font-semibold shadow"
            >
              A
            </div>

            {/* Name hidden on small screens */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">
                Admin
              </p>
              <p className="text-xs text-gray-500">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
