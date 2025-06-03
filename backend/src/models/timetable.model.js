import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: String,
      enum: ["Y1", "Y2", "Y3", "Y4"],
      required: true,
    },
    semester: {
      type: String,
      enum: ["S1", "S2"],
      require: true,
    },
    batch: {
      type: String,
      enum: ["WD", "WE"],
      required: true,
    },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
      required: true,
    },
    group: {
      type: Number,
      required: true,
    },
    subGroup: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "updated", "approved"],
      required: true,
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
