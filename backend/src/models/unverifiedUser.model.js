import mongoose from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@(my\.)?sliit\.lk$/;

const unverifiedUserSchema = mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid SLIIT email address!`,
    },
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "moderator", "user"],
  },
  verificationToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Auto-delete after 1 hour
});

const UnverifiedUser = mongoose.model("UnverifiedUser", unverifiedUserSchema);

export default UnverifiedUser;
