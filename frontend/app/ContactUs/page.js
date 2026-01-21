"use client";

import React, { useState } from "react";
import Header2 from "../Header2";
import { Footer } from "../Footer";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const submitDetails = (name, lastname, email, phone, company, message) => {
    if (
      name === "" ||
      lastname === "" ||
      email === "" ||
      phone === "" ||
      company === "" ||
      message === ""
    ) {
      alert("Please fill all details!!");
    } else {
      alert(
        "Name: " +
          name +
          "\nSurname: " +
          lastname +
          "\nCompany: " +
          company +
          "\nEmail: " +
          email +
          "\nPhone: " +
          phone +
          "\nMessage: " +
          message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header2 />

      {/* ================= HERO ================= */}
      <section className="relative py-20 px-4 sm:px-6">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-10rem] h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-400/30 blur-3xl" />
        </div>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Contact Us
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Lace up and let’s talk. We’d love to hear from you.
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* FIRST NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                First name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name
              </label>
              <input
                required
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* COMPANY */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Company
              </label>
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* EMAIL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* PHONE */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Phone number
              </label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* MESSAGE */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            onClick={() =>
              submitDetails(
                name,
                lastname,
                email,
                phone,
                company,
                message
              )
            }
            className="mt-8 w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Let’s Talk
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
