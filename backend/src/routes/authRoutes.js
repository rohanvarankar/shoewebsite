import express from "express";
import passport from "passport";
import { googleAuthSuccess } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * START GOOGLE LOGIN
 * WHY:
 * - This route sends the user to Google OAuth consent screen
 * - Passport handles redirect automatically
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

/**
 * GOOGLE CALLBACK URL
 * WHY:
 * - Google redirects user here after successful login
 * - Passport validates Google user
 * - Controller generates JWT and sends it to frontend
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false, // WHY: We are using JWT, not sessions
    failureRedirect: "/login"
  }),
  googleAuthSuccess
);

export default router;
