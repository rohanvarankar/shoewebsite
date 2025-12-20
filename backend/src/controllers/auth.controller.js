import jwt from "jsonwebtoken";

/**
 * Generate JWT token
 * WHY:
 * - JWT allows stateless authentication
 * - Frontend can store token and send it with every request
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: "user"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

/**
 * Google OAuth Success Handler
 * WHY:
 * - Passport already attached user to req.user
 * - We just need to generate token and redirect
 */
export const googleAuthSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    const token = generateToken(req.user);

    // Redirect with token (temporary approach)
    // Later we’ll switch to httpOnly cookies
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?token=${token}`
    );
  } catch (error) {
    console.error("Auth Controller Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};
