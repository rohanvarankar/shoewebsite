"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById } from "../productsView";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

/* Utility */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);

        if (!data) {
          setProduct(null);
        } else {
          setProduct(data);
          setSelectedSize(data.sizes?.[0]?.name || null);
        }
      } catch (error) {
        console.error("Failed to load product", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);
  /* ================================================ */

  /* ================= ADD TO CART ================= */
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to cart");
      router.push("/SignIn");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add to cart");
      }

      alert("Product added to cart successfully");
      router.push("/Cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong while adding to cart");
    }
  };
  /* =============================================== */

  /* ================= UI STATES ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-600">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-600">
        Product not found
      </div>
    );
  }
  /* ============================================= */

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= IMAGE SLIDER ================= */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            centeredSlides
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-[320px]"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`http://localhost:5000${img.src}`}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {product.name}
          </h1>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Description
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <p className="text-3xl font-bold text-slate-900 mb-6">
            ₹{product.price}
          </p>

          {/* SIZE */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Select Size
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  className={classNames(
                    "py-2 rounded-lg border text-sm font-medium transition",
                    selectedSize === size.name
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-300 hover:border-indigo-400"
                  )}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={selectedQuantity}
              onChange={(e) =>
                setSelectedQuantity(Number(e.target.value))
              }
              min={1}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* ADD TO CART */}
          <button
            onClick={addToCart}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
