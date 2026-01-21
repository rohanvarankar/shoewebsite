import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <img
              src="https://media.istockphoto.com/id/1665714191/vector/shoes-shop.jpg?s=612x612&w=0&k=20&c=bFQXXwYhDyN0SQPgfWy8x_qIpIDRx7ckuojuh2MU1fI="
              alt="ShoeStore"
              className="h-20 w-auto mb-4 rounded"
            />
            <p className="text-sm text-slate-400 leading-relaxed">
              ShoeStore is committed to empowering individuals with
              high-quality, stylish, and comfortable footwear designed
              for everyday performance.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="hover:text-indigo-400 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/About"
                  className="hover:text-indigo-400 transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* PAGES */}
          <div>
            <h3 className="text-white font-semibold mb-4">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/ShoeList"
                  className="hover:text-indigo-400 transition"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/ContactUs"
                  className="hover:text-indigo-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">📍</span>
                <span>
                  55 East Birchwood Ave, Brooklyn, New York 11201
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-400">📞</span>
                <span>(603) 555-0123</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-400">✉️</span>
                <span>example@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-400 mb-4 sm:mb-0">
            © 2024 ShoeStore. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="hover:text-indigo-400 transition"
            >
              Licensing
            </a>
            <a
              href="#"
              className="hover:text-indigo-400 transition"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
