import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "moderator", "user"],
    },
    position: {
      type: String,
    },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
    },
    savedTimetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timetable",
        default: [],
      },
    ],
    addedTimetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timetable",
        default: [],
      },
    ],
    updatedTimetables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timetable",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
