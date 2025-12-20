"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /* ================= LOGOUT ================= */
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/SignIn");
  };
  /* ========================================== */

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-800 mr-4 relative group ${
          isActive ? "text-gray-800" : ""
        }`}
      >
        <span className="relative">
          {children}
          <span
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-800 transform origin-left transition-transform duration-300 ${
              isActive
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        </span>
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav role="navigation" className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between flex-wrap">
          {/* LOGO */}
          <div className="flex items-center flex-shrink-0 mr-6">
            <img
              src="https://media.istockphoto.com/id/1665714191/vector/shoes-shop.jpg?s=612x612&w=0&k=20&c=bFQXXwYhDyN0SQPgfWy8x_qIpIDRx7ckuojuh2MU1fI="
              alt="Company logo"
              className="w-16 sm:w-24 h-auto"
            />
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-gray-700 hover:border-gray-700"
            >
              <HiMenu size={24} />
            </button>
          </div>

          {/* NAV LINKS */}
          <div
            className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="text-sm lg:flex-grow mt-4 lg:mt-0">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/ShoeList">Products</NavLink>
              <NavLink href="/About">About</NavLink>
              <NavLink href="/ContactUs">Contact</NavLink>
            </div>

            {/* SEARCH + USER INFO + ICONS */}
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row items-center">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center mb-2 sm:mb-0 sm:mr-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
                />
                <button
                  type="submit"
                  className="text-gray-600 hover:text-gray-700 ml-2"
                >
                  <FaSearch size={22} />
                </button>
              </form>

              {/* WELCOME USER */}
              {isLoggedIn && userName && (
                <span className="mr-3 text-sm text-gray-700">
                  Welcome, <strong>{userName}</strong>
                </span>
              )}

              <div className="flex items-center mt-2 sm:mt-0">
                <Link
                  href="/Cart"
                  className="text-gray-600 hover:text-gray-700 mr-4"
                >
                  <FaShoppingCart size={22} />
                </Link>

                {/* AUTH ICON */}
                {!isLoggedIn ? (
                  <Link
                    href="/SignIn"
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <CgProfile size={22} />
                  </Link>
                ) : (
                  <button
                    onClick={logoutHandler}
                    className="text-gray-600 hover:text-gray-700"
                    title="Logout"
                  >
                    <CgProfile size={22} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
