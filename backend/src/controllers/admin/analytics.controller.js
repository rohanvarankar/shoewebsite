import Order from "../../models/Order.model.js";
import User from "../../models/User.model.js";
import Product from "../../models/Product.model.js";

/**
 * @desc    Admin Dashboard Analytics
 * @route   GET /api/admin/analytics/dashboard
 * @access  Admin only
 */
export const getDashboardAnalytics = async (req, res) => {
  try {
    /* =========================
       BASIC STATS
    ========================= */
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    /* =========================
       TOTAL REVENUE
    ========================= */
    const revenueResult = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    /* =========================
       ORDERS BY STATUS
    ========================= */
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    /* =========================
       LAST 7 DAYS REVENUE
    ========================= */
    const last7DaysRevenue = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    /* =========================
       TOP SELLING PRODUCTS
    ========================= */
    const topProducts = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.qty" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    /* =========================
       RECENT ORDERS (STEP 2)
    ========================= */
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("totalPrice isPaid status createdAt user");

    /* =========================
       ADVANCED / AI INSIGHTS (STEP 3)
    ========================= */
    const lowStockProducts = await Product.find({
      countInStock: { $lte: 5 },
    }).select("name countInStock");

    const repeatCustomersAgg = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          orderCount: { $sum: 1 },
        },
      },
      { $match: { orderCount: { $gte: 2 } } },
      { $count: "repeatCustomers" },
    ]);

    const repeatCustomerCount =
      repeatCustomersAgg[0]?.repeatCustomers || 0;

    /* =========================
       FINAL RESPONSE
    ========================= */
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
      ordersByStatus,
      last7DaysRevenue,
      topProducts,
      recentOrders,
      advancedInsights: {
        lowStockProducts,
        repeatCustomerCount,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard analytics",
    });
  }
};
