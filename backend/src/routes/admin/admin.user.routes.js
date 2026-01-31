import express from "express";
import {
  getAllUsersAdmin,
  toggleUserBlockStatus
} from "../../controllers/admin/user.controller.js";

const router = express.Router();

router.get("/", getAllUsersAdmin);
router.put("/:id/block", toggleUserBlockStatus);

export default router;
