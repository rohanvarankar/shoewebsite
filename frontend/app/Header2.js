"use client";

import { useState, useEffect } from "react";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu } from "react-icons/hi";

const Header2 = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between flex-wrap">
          {/* LOGO */}
          <div className="flex items-center flex-shrink-0 mr-6">
            <img
  src="/logoheader.png"
  alt="Company logo"
  className="w-16 sm:w-24 h-auto rounded-lg"
/>

          </div>

          {/* MOBILE MENU */}
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500"
            >
              <HiMenu size={24} />
            </button>
          </div>

          {/* NAV */}
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

            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row items-center">
              {/* WELCOME USER */}
              {isLoggedIn && userName && (
                <span className="mr-4 text-sm text-gray-700">
                  Welcome, <strong>{userName}</strong>
                </span>
              )}

              <div className="flex items-center mt-2 sm:mt-0">
                <Link href="/Cart" className="mr-4">
                  <FaShoppingCart size={22} />
                </Link>

                {/* AUTH ACTION */}
                {!isLoggedIn ? (
                  <Link href="/SignIn">
                    <CgProfile size={22} />
                  </Link>
                ) : (
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <FaSignOutAlt size={18} />
                    <span className="text-sm">Logout</span>
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

export default Header2;
