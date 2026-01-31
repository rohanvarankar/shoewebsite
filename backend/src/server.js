import dotenv from "dotenv";
import adminAnalyticsRoutes from "./routes/admin/admin.analytics.routes.js";

app.use("/api/admin/analytics", adminAnalyticsRoutes);
// 🔹 Load environment variables FIRST
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

// 🔹 Connect database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
