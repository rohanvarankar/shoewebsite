import Product from "../../models/Product.model.js";

/**
 * @desc    Get all products (admin)
 * @route   GET /api/admin/products
 * @access  Admin
 */
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};

/**
 * @desc    Update product details
 * @route   PUT /api/admin/products/:id
 * @access  Admin
 */
export const updateProductAdmin = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product update failed"
    });
  }
};

/**
 * @desc    Enable / Disable product (soft delete)
 * @route   PATCH /api/admin/products/:id/toggle
 * @access  Admin
 */
export const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? "enabled" : "disabled"} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product status"
    });
  }
};
