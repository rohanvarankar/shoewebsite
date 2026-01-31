"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      router.push("/signin");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-[256px_1fr] min-h-screen">
        {/* SIDEBAR */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* MAIN */}
        <div className="flex flex-col min-h-screen">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
