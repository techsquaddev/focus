import express from "express";
import {
  createSpecialization,
  getAllSpecializations,
  deleteSpecialization,
  updateSpecialization,
} from "../controllers/specialization.controller.js";
import { isAdmin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, isAdmin, createSpecialization)
  .get(getAllSpecializations);
router
  .route("/:specializationId")
  .put(protect, isAdmin, updateSpecialization)
  .delete(protect, isAdmin, deleteSpecialization);

export default router;
