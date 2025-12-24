import Cart from "../models/Cart.model.js";

/**
 * ADD ITEM TO CART
 * POST /api/cart/add
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
    });
  }
};

/**
 * ✅ GET LOGGED-IN USER CART
 * GET /api/cart
 */
export const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    // User has no cart yet
    if (!cart) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json({
      items: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
};
