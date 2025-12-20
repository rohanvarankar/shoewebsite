"use client";
import React, { useState } from 'react';
import { Footer } from '../Footer';
import Header2 from '../Header2';

export default function ContactUs() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const submitDetails = (name, lastname, email, phone, company, message) => {
    if (name === "" || lastname === "" || email === "" || phone === "" || company === "" || message === "") {
      alert("Please fill all details!!");
    }
    else {
      alert("Name: " + name + "\nSurname: " + lastname + "\nCompany" + company + "\nEmail: " + email + "\nPhone: " + phone + "\nMessage: " + message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header2 />

      <div className="bg-blue-100 relative isolate px-4 sm:px-6 py-12 sm:py-24 lg:py-32">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#50c2f7] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-2 text-base sm:text-lg leading-8 text-gray-600">Lace up and let's talk.</p>
        </div>
        <form action="#" method="POST" className="mx-auto mt-8 sm:mt-16 max-w-xl  bg-white p-4 sm:p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
              <div className="mt-2">
                <input required value={name} onChange={(n) => setName(n.target.value)} type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
              <div className="mt-2">
                <input required value={lastname} onChange={(n) => setLastName(n.target.value)} type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">Company</label>
              <div className="mt-2">
                <input required value={company} onChange={(n) => setCompany(n.target.value)} type="text" name="company" id="company" autoComplete="organization" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input required value={email} onChange={(n) => setEmail(n.target.value)} type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
              <div className="relative mt-2">
                <input required value={phone} onChange={(n) => setPhone(n.target.value)} type="tel" name="phone-number" id="phone-number" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
              <div className="mt-2">
                <textarea required value={message} onChange={(n) => setMessage(n.target.value)} name="message" id="message" rows="4" className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm sm:leading-6"></textarea>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-10">
            <button
              type="submit"
              onClick={() => submitDetails(name, lastname, email, phone, company, message)}
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600">
              Let's talk
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}