import User from "../../models/User.model.js";
import Product from "../../models/Product.model.js";
import Order from "../../models/Order.model.js";

/**
 * @desc    Get admin dashboard metrics
 * @route   GET /api/admin/analytics/dashboard
 * @access  Admin
 */
export const getDashboardMetrics = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();

    // Total revenue (aggregation)
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Today date range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Orders today
    const ordersToday = await Order.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    // Revenue today
    const revenueTodayResult = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd }
        }
      },
      {
        $group: {
          _id: null,
          revenueToday: { $sum: "$totalAmount" }
        }
      }
    ]);

    const revenueToday = revenueTodayResult[0]?.revenueToday || 0;

    // Low stock products
    const lowStockProducts = await Product.countDocuments({
      "sizes.stock": { $lte: 5 },
      isActive: true
    });

    res.status(200).json({
      success: true,
      metrics: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        ordersToday,
        revenueToday,
        lowStockProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard metrics"
    });
  }
};
