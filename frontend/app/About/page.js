"use client";

import { useState } from "react";
import Header2 from "../Header2";
import { Footer } from "../Footer";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header2 />

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Images */}
        <div className="space-y-6">
          <img
            src="/shoes.png"
            alt="Shoes collection"
            className="w-full max-w-md mx-auto rounded-xl shadow-md hover:scale-105 transition duration-300"
          />
          <img
            src="/shoes2.png"
            alt="Shoes showcase"
            className="w-full max-w-md mx-auto rounded-xl shadow-md hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
            Welcome to <span className="font-semibold">ShoeWebsite</span>, the
            ultimate destination for shoe enthusiasts and fashion-forward
            individuals. We bring premium quality, comfort, and trend-driven
            footwear from across the globe.
          </p>

          <button
            onClick={() => (window.location.href = "/ContactUs")}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Our Partners
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {["/flipkart.png", "/amazon.png", "/myntra.png", "/snapdeal.png"].map(
              (src, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border rounded-xl p-6 flex items-center justify-center hover:shadow-lg hover:scale-105 transition duration-300"
                >
                  <img
                    src={src}
                    alt="Partner logo"
                    className="h-20 object-contain"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Our Team
          </h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-3xl mx-auto">
            A passionate group of leaders and innovators committed to building
            an exceptional shopping experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Siya", role: "CEO & Founder", img: "/ai2.png" },
              { name: "Jullie", role: "Director", img: "/ai3.png" },
              { name: "Mathew", role: "Assistant Director", img: "/ai4.png" },
            ].map((person, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-6"
                />
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="text-slate-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-slate-600 mb-10">
            Answers to the questions we get asked the most.
          </p>

          <div className="space-y-4">
            {[
              {
                q: "What is your return policy?",
                a: "You can return any shoes within 30 days of purchase for a full refund.",
              },
              {
                q: "How do I track my order?",
                a: "Once your order ships, we’ll email you the tracking details.",
              },
              {
                q: "Do you offer international shipping?",
                a: "Yes, we ship worldwide. Additional charges may apply.",
              },
              {
                q: "Can I change my order after placing it?",
                a: "Orders can be modified within 24 hours by contacting support.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-5 cursor-pointer hover:shadow-md transition"
                onClick={() => toggleAnswer(index)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{item.q}</h4>
                  <span className="text-xl font-bold">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`mt-3 text-slate-600 transition-all duration-300 ${
                    activeIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
