const adminOnly = (req, res, next) => {
  try {
    // auth.middleware must already attach req.user
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    if (req.user.isBlocked) {
      return res.status(403).json({
        message: "Account is blocked by admin",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Admin authorization failed",
    });
  }
};

export default adminOnly;
