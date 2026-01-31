import User from "../../models/User.model.js";
import Order from "../../models/Order.model.js";

/**
 * @desc    Get all users (admin)
 * @route   GET /api/admin/users
 * @access  Admin
 */
export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-googleId")
      .sort({ createdAt: -1 });

    // Attach order count per user
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orderCount = await Order.countDocuments({ user: user._id });
        return {
          ...user.toObject(),
          orderCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: usersWithOrders.length,
      users: usersWithOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

/**
 * @desc    Block / Unblock user
 * @route   PUT /api/admin/users/:id/block
 * @access  Admin
 */
export const toggleUserBlockStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be blocked"
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user status"
    });
  }
};
