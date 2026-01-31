import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";

// 🔹 ROUTES
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; 
import adminAnalyticsRoutes from "./routes/admin/admin.analytics.routes.js";
import adminRoutes from "./routes/admin/admin.routes.js";// ✅ NEW

// 🔹 IMPORTANT: load Google OAuth strategy
import "./auth/google.strategy.js";

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// 🔹 Initialize passport
app.use(passport.initialize());

// ======================
// STATIC FILES
// ======================
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ======================
// ROUTES
// ======================
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes); // ✅ REGISTERED
app.use("/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

export default app;
