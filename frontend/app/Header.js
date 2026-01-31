"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";

export const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  /* ================= AUTH + USER FETCH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setUserName("");
      return;
    }

    setIsLoggedIn(true);

    const fetchUserProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUserName(data.user.name);
        } else {
          setIsLoggedIn(false);
          setUserName("");
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    fetchUserProfile();
  }, []);
  /* ===================================================== */

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/SignIn");
  };

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-3 py-2 text-sm font-medium transition ${
          isActive
            ? "text-indigo-600"
            : "text-slate-600 hover:text-indigo-600"
        }`}
      >
        {children}
        <span
          className={`absolute left-0 -bottom-1 h-0.5 w-full bg-indigo-600 transition-transform origin-left ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/logoheader.png"
              alt="Company logo"
              className="w-16 sm:w-24 h-auto rounded-lg"
            />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md border border-slate-300 text-slate-600"
          >
            <HiMenu size={22} />
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/ShoeList">Products</NavLink>
            <NavLink href="/About">About</NavLink>
            <NavLink href="/ContactUs">Contact</NavLink>

            {/* ✅ MY ORDERS (LOGGED IN ONLY) */}
            {isLoggedIn && <NavLink href="/my-orders">My Orders</NavLink>}
          </div>

          {/* SEARCH + USER */}
          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-3 pr-10 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
              >
                <FaSearch size={16} />
              </button>
            </form>

            {isLoggedIn && userName && (
              <span className="text-sm text-slate-700">
                Hi, <strong>{userName}</strong>
              </span>
            )}

            <Link href="/Cart" className="text-slate-700 hover:text-indigo-600">
              <FaShoppingCart size={20} />
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/SignIn"
                className="text-slate-700 hover:text-indigo-600"
              >
                <CgProfile size={22} />
              </Link>
            ) : (
              <button
                onClick={logoutHandler}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            )}
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-slate-50 rounded-lg p-4 space-y-3">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/ShoeList">Products</NavLink>
            <NavLink href="/About">About</NavLink>
            <NavLink href="/ContactUs">Contact</NavLink>

            {/* ✅ MY ORDERS (MOBILE) */}
            {isLoggedIn && <NavLink href="/my-orders">My Orders</NavLink>}
          </div>
        )}
      </nav>
    </header>
  );
};
