import express from "express";
import {
  loginUser,
  registerUser,
  registerUnverifiedUser,
  verifyEmail,
  verifyToken,
  logoutUser,
  getLoggedInUser,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/register", registerUnverifiedUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/verify-token", verifyToken);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getLoggedInUser);
router
  .route("/:id")
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

export default router;
