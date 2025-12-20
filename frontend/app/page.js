"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Splash } from "./Splash";
import { Footer } from "./Footer";
import Header2 from "./Header2";

const page = () => {
  // 🔹 Latest shoes (dynamic)
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestLoading, setLatestLoading] = useState(true);

  // 🔹 Fetch last 4 products added by admin
  useEffect(() => {
    const fetchLatestShoes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          cache: "no-store",
        });
        const data = await res.json();
        const lastFour = data.slice(-4).reverse();
        setLatestProducts(lastFour);
      } catch (err) {
        console.error("Failed to fetch latest shoes", err);
      } finally {
        setLatestLoading(false);
      }
    };

    fetchLatestShoes();
  }, []);

  const slides = [
    "https://cdn.prod.website-files.com/65a62949580c5ed45b48f683/6634e3fc68f6e5864f36163d_freepik-export-20240501185623I1X8.webp",
    "https://cdn.prod.website-files.com/65a62949580c5ed45b48f683/6634e3fc68f6e5864f36163d_freepik-export-20240501185623I1X8.webp",
    "https://cdn.prod.website-files.com/65a62949580c5ed45b48f683/6634e3fc68f6e5864f36163d_freepik-export-20240501185623I1X8.webp",
  ];

  const [splash, setSplash] = useState(true);
  const shoeCircleRef = useRef(null);
  const shoeCircleRef2 = useRef(null);

  // 🔹 ROTATION ANIMATION (UNCHANGED)
  useEffect(() => {
    let rotation = 0;
    let animationFrameId;

    const rotateShoes = () => {
      rotation += 0.5;
      if (shoeCircleRef.current) {
        shoeCircleRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      if (shoeCircleRef2.current) {
        shoeCircleRef2.current.style.transform = `rotate(${rotation}deg)`;
      }
      animationFrameId = requestAnimationFrame(rotateShoes);
    };

    rotateShoes();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {splash ? (
        <Splash />
      ) : (
        <>
          <Header2 />

          <main>
            {/* HERO */}
            <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Embrace Comfort with shoe - Online Ecommerce Shop!
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
                    Step into a world of style and comfort with shoe, where every
                    pair of shoes tells a story.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/About")}
                    className="bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition"
                  >
                    Learn About Us
                  </button>
                </div>

                <div className="w-full md:w-1/2 order-1 md:order-2 relative">
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    centeredSlides
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="w-full sm:w-3/4 mx-auto"
                  >
                    {slides.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <img src={slide} alt={`Slide ${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </section>

            {/* ROTATING CIRCLE SECTION */}
            <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 mb-8">
                  <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] mx-auto">
                    <div className="absolute z-10 inset-0 flex items-center justify-center">
                      <img
                        src="https://cdn.prod.website-files.com/65a62949580c5ed45b48f683/65aeafaad7a03ebd79308259_monaal-garg-99NxpMVxWDA-unsplash.webp"
                        className="w-32 h-32 rounded-full shadow-lg"
                        alt="center shoe"
                      />
                    </div>

                    <div ref={shoeCircleRef} className="absolute inset-0">
                      <img
                        src="https://rukminim2.flixcart.com/image/300/300/xif0q/shoe/m/l/2/-original-imagz5kftqzfpzyw.jpeg?q=90"
                        className="absolute top-0 left-1/2 w-20 h-20 -translate-x-1/2 rounded-lg shadow-lg"
                      />
                      <img
                        src="https://cdn.prod.website-files.com/65a62949580c5ed45b48f683/65ef21ccf486a102b5b7a0f4_nikita-kachanovsky-ad_0wMHtvlU-unsplash.webp"
                        className="absolute right-0 top-1/2 w-20 h-20 -translate-y-1/2 rounded-lg shadow-lg"
                      />
                      <img
                        src="https://cdn.prod.website-files.com/65a62949580c5ed45b48f683/65b689fa3dc80ee41a3c6bf2_jakob-owens-JzJSybPFb3s-unsplash.webp"
                        className="absolute bottom-0 left-1/2 w-20 h-20 -translate-x-1/2 rounded-lg shadow-lg"
                      />
                      <img
                        src="https://rukminim2.flixcart.com/image/300/300/xif0q/shoe/7/w/r/-original-imahfxuxfpfmcpa3.jpeg?q=90"
                        className="absolute left-0 top-1/2 w-20 h-20 -translate-y-1/2 rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">About shoe</h2>
                  <p className="text-gray-600 mb-6">
                    We create footwear that blends comfort, design and durability.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/ShoeList")}
                    className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
                  >
                    View Our Products
                  </button>
                </div>
              </div>
            </section>

            {/* LATEST SHOES */}
            <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
              <h2 className="text-3xl font-bold mb-6">Latest Shoes</h2>

              {latestLoading ? (
                <p>Loading latest shoes...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {latestProducts.map((product) => (
                    <Link
                      key={product._id}
                      href={`/ShoeList/${product._id}`}
                      className="bg-white rounded shadow p-4 hover:scale-105 transition"
                    >
                      <img
                        src={`http://localhost:5000${product.images?.[0]}`}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                      />
                      <h3 className="font-bold mt-3">{product.name}</h3>
                      <p className="text-blue-600">₹{product.price}</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default page;
