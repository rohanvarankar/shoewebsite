/**
 * GET LOGGED-IN USER PROFILE
 * WHY:
 * - Header needs user name
 * - Data must come from database
 */
export const getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile"
    });
  }
};
