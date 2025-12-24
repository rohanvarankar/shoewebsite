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

    // 1️⃣ User must be logged in
    if (!token) {
      alert("Please login to add items to cart");
      router.push("/SignIn");
      return;
    }

    // 2️⃣ Size validation
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
          productId: product.id, // normalized ID
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
    return <div className="p-10">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }
  /* ============================================= */

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* IMAGE SLIDER */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            centeredSlides
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-full mx-auto h-[300px]"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index} className="relative h-full">
                <img
                  src={`http://localhost:5000${img.src}`}
                  alt={img.alt}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* PRODUCT INFO */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>

            {/* SIZE */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={classNames(
                      "border px-4 py-2 rounded",
                      selectedSize === size.name
                        ? "border-indigo-600 ring-2 ring-indigo-500"
                        : "border-gray-300"
                    )}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-5 max-w-xs">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded"
                min={1}
              />
            </div>

            {/* ADD TO CART */}
            <button
              onClick={addToCart}
              className="mt-10 flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Add to cart
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="py-10 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
