// This file is now a DATA FETCHER (not static data)

export async function fetchProductById(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Product not found");
    }

    const product = await res.json();

    // 🔹 Normalize backend data to match UI needs
    return {
      id: product._id,
      name: product.name,
      price: `₹${product.price}`,
      images: product.images.map((img) => ({
        src: img,
        alt: product.name,
      })),
      sizes: product.sizes.map((size) => ({
        name: size,
        inStock: true,
      })),
      description: product.description || "No description available",
      highlights: product.highlights || [],
      details: product.details || "",
    };
  } catch (error) {
    console.error("fetchProductById error:", error);
    return null;
  }
}
