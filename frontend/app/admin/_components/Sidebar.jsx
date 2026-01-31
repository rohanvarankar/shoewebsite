"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: Package,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: ShoppingCart,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
    },
  ];

  return (
    <aside
      className={`fixed md:static z-40 top-0 left-0 h-full w-64
      bg-gradient-to-b from-indigo-700 to-purple-700 text-white
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/20">
            🛍️
          </div>
          <span className="text-lg font-bold tracking-wide">
            Shoe Admin
          </span>
        </div>

        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="md:hidden text-white/80 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                active
                  ? "bg-white text-indigo-700 shadow-lg"
                  : "text-white/90 hover:bg-white/20 hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={`${
                  active ? "text-indigo-700" : "text-white/80"
                }`}
              />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="absolute bottom-0 w-full p-4 text-xs text-white/70">
        © {new Date().getFullYear()} ShoeWebsite Admin
      </div>
    </aside>
  );
}
