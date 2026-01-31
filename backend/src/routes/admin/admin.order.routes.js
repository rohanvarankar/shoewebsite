import express from "express";
import {
  getAllOrdersAdmin,
  updateOrderStatus
} from "../../controllers/admin/order.controller.js";

const router = express.Router();

router.get("/", getAllOrdersAdmin);
router.put("/:id/status", updateOrderStatus);

export default router;
