import express from "express";
import {
  createTimetable,
  deleteTimetable,
  getAllTimetables,
  getSpecificTimetable,
  updateTimetable,
  findTimetable,
} from "../controllers/timetable.controller.js";
import { isAdmin, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, createTimetable).get(getAllTimetables);
router.post("/find", findTimetable);
router
  .route("/:timetableId")
  .get(getSpecificTimetable)
  .put(protect, updateTimetable)
  .delete(protect, isAdmin, deleteTimetable);

export default router;
