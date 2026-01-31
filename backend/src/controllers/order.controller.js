import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

/**
 * =====================================================
 * CREATE NEW ORDER FROM CART
 * @route   POST /api/orders
 * @access  Private
 * =====================================================
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 2️⃣ Validate address
    const {
      fullName,
      phone,
      email,
      house,
      street,
      city,
      state,
      pincode,
      country,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !house ||
      !street ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All address fields are required",
      });
    }

    // 3️⃣ Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
    }));

    // 4️⃣ Calculate total
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0
    );

    // 5️⃣ Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      address: {
        fullName,
        phone,
        email,
        house,
        street,
        city,
        state,
        pincode,
        country: country || "India",
      },
      totalAmount,
      paymentMethod: "online",
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    // 6️⃣ Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

/**
 * =====================================================
 * GET LOGGED-IN USER ORDERS
 * @route   GET /api/orders/my
 * @access  Private
 * =====================================================
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name images price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/**
 * =====================================================
 * GET SINGLE ORDER DETAILS
 * @route   GET /api/orders/:id
 * @access  Private
 * =====================================================
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product", "name images price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order by id error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};
