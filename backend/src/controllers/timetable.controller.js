import Session from "../models/session.model.js";
import Timetable from "../models/timetable.model.js";
import Specialization from "../models/specialization.model.js";

// create a new timetable
export const createTimetable = async (req, res) => {
  try {
    const { year, semester, batch, specialization, group, subGroup } = req.body;

    // Validate required fields
    if (!year || !semester || !batch || !specialization || !group) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Ensure specialization is a valid ObjectIds
    const specializationExists = await Specialization.findById(specialization);

    if (!specializationExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid specialization",
      });
    }

    // Generate the name
    const name = subGroup
      ? `${year}.${semester}.${batch}.${specializationExists.code}.${group}.${subGroup}`
      : `${year}.${semester}.${batch}.${specializationExists.code}.${group}`;

    // Check if a timetable with the generated name already exists
    const existingTimetable = await Timetable.findOne({ name });

    if (existingTimetable) {
      return res.status(400).json({
        success: false,
        message: "A timetable for this batch already exists",
      });
    }

    const newTimetable = await Timetable.create({
      name,
      year,
      semester,
      batch,
      specialization,
      group,
      subGroup,
      status: "approved",
    });

    res.status(201).json(newTimetable);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in create timetable", error });
  }
};

// get all timetables
export const getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all timetables",
      error: error,
    });
  }
};

// get a specific timetable by id
export const getSpecificTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({
      _id: req.params.timetableId,
    })
      .populate("sessions")
      .populate("specialization", "name code");

    if (!timetable) {
      return res
        .status(404)
        .json({ success: false, message: "Timetable id not found" });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in get a specific timetable",
      err,
    });
  }
};

// find a timetable based on provided details
export const findTimetable = async (req, res) => {
  try {
    const { year, semester, batch, specialization, group, subGroup } = req.body;

    // Find the timetable based on the provided details
    const foundTimetable = await Timetable.findOne({
      year,
      semester,
      batch,
      specialization,
      group,
      subGroup,
    })
      .populate("sessions")
      .populate("specialization", "name code");

    if (!foundTimetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found",
      });
    }

    res.status(200).json(foundTimetable);
  } catch (error) {
    console.log("Error in find timetable controller", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in finding timetable", error });
  }
};

// update a timetable by id
export const updateTimetable = async (req, res) => {
  try {
    const timetableId = req.params.timetableId;

    const timetableExist = await Timetable.findById(timetableId);
    if (!timetableExist) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    const { year, semester, batch, specialization, group, subGroup } = req.body;

    // Ensure specialization is a valid ObjectIds
    const specializationExists = await Specialization.findById(specialization);

    if (!specializationExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid specialization",
      });
    }

    // Regenerate the name
    const name = subGroup
      ? `${year}.${semester}.${batch}.${specializationExists.code}.${group}.${subGroup}`
      : `${year}.${semester}.${batch}.${specializationExists.code}.${group}`;

    // Check if a timetable with the generated name already exists
    const existingTimetable = await Timetable.findOne({ name });

    if (existingTimetable && existingTimetable._id.toString() !== timetableId) {
      return res.status(400).json({
        success: false,
        message: "A timetable for this batch already exists",
      });
    }

    const updatedTimetable = await Timetable.findByIdAndUpdate(
      timetableId,
      { ...req.body, name },
      {
        new: true,
      }
    );

    res.status(200).json(updatedTimetable);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update a specific timetable",
      error,
    });
  }
};

// Delete a timetable by id
export const deleteTimetable = async (req, res) => {
  try {
    const timetableId = req.params.timetableId;
    const timetableExist = await Timetable.findById(timetableId);
    if (!timetableExist) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    const deletedTimetable = await Timetable.findByIdAndDelete(timetableId);

    await Session.deleteMany({
      timetableId: deletedTimetable._id,
    });

    res.status(200).json({
      success: true,
      message: "Timetable and reference sessions deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in delete timetable",
      error: error,
    });
  }
};
