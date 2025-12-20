import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    brand: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    sizes: {
      type: [Number],
      required: true
    },

    stock: {
      type: Number,
      required: true
    },

    images: {
      type: [String],
      required: true
    },

    description: {
      type: String
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
