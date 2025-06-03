import express from "express";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getAllSessionsByTimetableId,
  getSpecificSession,
  updateSession,
} from "../controllers/session.controller.js";
const router = express.Router();
import { protect } from "../middleware/auth.middleware.js";

router.post("/:timetableId", protect, createSession);
router.get("/", getAllSessions);
router.get("/find/:timetableId", getAllSessionsByTimetableId);
router
  .route("/:sessionId")
  .get(getSpecificSession)
  .put(protect, updateSession)
  .delete(protect, deleteSession);

export default router;
