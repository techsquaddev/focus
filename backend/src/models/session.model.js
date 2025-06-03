import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    timetableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timetable",
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    time: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    moduleName: {
      type: String,
      require: true,
    },
    moduleCode: {
      type: String,
      required: true,
    },
    sessionType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    coordinator: {
      type: String,
    },
    deliveryType: {
      type: String,
    },
    sessionLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
