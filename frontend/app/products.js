// frontend/app/product.js

export const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products", {
      cache: "no-store", // always get fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
