import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getMyProfile } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * GET /api/users/me
 * Protected route
 */
router.get("/me", protect, getMyProfile);

export default router;
