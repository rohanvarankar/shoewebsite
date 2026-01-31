import Order from "../../models/Order.model.js";

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/admin/orders
 * @access  Admin
 */
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.query;

    const filter = {};

    if (orderStatus) filter.orderStatus = orderStatus;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/admin/orders/:id/status
 * @access  Admin
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["pending", "shipped", "delivered"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status"
    });
  }
};
