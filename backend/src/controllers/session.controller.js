import Session from "../models/session.model.js";
import Timetable from "../models/timetable.model.js";

// create a new session
export const createSession = async (req, res) => {
  try {
    const {
      day,
      startTime,
      endTime,
      moduleName,
      moduleCode,
      sessionType,
      location,
      coordinator,
      deliveryType,
      sessionLink,
    } = req.body;

    let timetable = await Timetable.findById(req.params.timetableId);
    if (!timetable) {
      return res
        .status(404)
        .json({ success: false, message: "Timetable not found", error });
    }

    const newSession = new Session({
      timetableId: timetable._id,
      day,
      time: { startTime, endTime },
      moduleName,
      moduleCode,
      sessionType,
      location,
      coordinator,
      deliveryType,
      sessionLink,
    });

    if (newSession) {
      timetable.sessions.push(newSession._id);
    }

    // this will in parallel
    await Promise.all([timetable.save(), newSession.save()]);

    res.status(201).json(newSession);
  } catch (error) {
    console.log("Error in create session", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in create session", error });
  }
};

// get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const session = await Session.find();
    res.status(200).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in get all sessions", error });
  }
};

// get a specific session by id
export const getSpecificSession = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.sessionId });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get a specific session",
      error,
    });
  }
};

// Get all sessions by timetable ID
export const getAllSessionsByTimetableId = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.timetableId);
    if (!timetable) {
      return res
        .status(404)
        .json({ success: false, message: "Timetable not found" });
    }

    const sessions = await Session.find({ timetableId: timetable._id });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving sessions by timetable ID",
      error: error.message,
    });
  }
};

// update a session by id
export const updateSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const sessionExist = await Session.findById(sessionId);
    if (!sessionExist) {
      return res.status(404).json({ message: "Sesion not found" });
    }
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update a specific session",
      error,
    });
  }
};

// Delete session with reference data
export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    // Find and delete the session from sessionSchema
    const deletedSession = await Session.findByIdAndDelete(sessionId);

    if (!deletedSession) {
      return res.status(404).send({ message: "Session not found" });
    }

    // Remove the session reference from timetableSchema
    await Timetable.updateMany(
      { sessions: sessionId },
      { $pull: { sessions: sessionId } }
    );

    res.status(200).send({
      success: true,
      message: "Session deleted and references updated successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting session and updating references",
      error: error.message,
    });
  }
};
