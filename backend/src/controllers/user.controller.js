import User from "../models/user.model.js";
import UnverifiedUser from "../models/unverifiedUser.model.js";
import generateToken from "../utils/generateToken.js";
import generateMagicLink from "../utils/generateMagicLink.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email!" });
    }

    // Generate Magic Link
    await generateMagicLink(user._id, email);

    res.status(200).json({ message: "Login link sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Register user
// route POST /api/users
// @access Public
export const registerUser = async (req, res) => {
  try {
    // Check existing users
    const { firstName, lastName, email, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = await User.create({
      name: { firstName, lastName },
      email,
      role,
    });

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Register Unverified User
// route POST /api/users/register
// @access Public
export const registerUnverifiedUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if email is already registered or pending verification
    const userExists = await User.findOne({ email });
    const unverifiedUserExists = await UnverifiedUser.findOne({ email });
    if (userExists || unverifiedUserExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save unverified user
    await UnverifiedUser.create({
      name: { firstName, lastName },
      email,
      role: "user",
      verificationToken,
    });

    // Send verification email
    const verificationLink = `${process.env.ALLOWED_ORIGIN}/verify/email?token=${verificationToken}`;
    await sendEmail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verificationLink}`
    );

    res.status(201).json({
      message:
        "Registration initiated. Check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Verify Registration Email
// route POST /api/users/verify-email
// @access Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Find unverified user by token
    const unverifiedUser = await UnverifiedUser.findOne({
      verificationToken: token,
    });
    if (!unverifiedUser) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Move user to main collection
    const { name, email, role } = unverifiedUser;
    const newUser = await User.create({
      name,
      email,
      role,
    });

    // Remove unverified user
    await unverifiedUser.deleteOne();

    generateToken(res, newUser._id);

    res.status(200).json({
      message: "Email verified successfully. No need to login again!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Verify Magic Link
// route POST /api/users/verify
// @access Public
export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the magic link token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (user) {
      generateToken(res, user._id);
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// @desc Logout user
// route POST /api/users
// @access Private
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Logged In User
// route GET /api/users/me
// @access Private
export const getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update user profile
// route PUT /api/users/id
// @access Private
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    position,
    specialization,
    savedTimetables,
    addedTimetables,
    updatedTimetables,
  } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    user.name.firstName = firstName || user.name.firstName;
    user.name.lastName = lastName || user.name.lastName;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    user.role = role || user.role;
    user.position = position || user.position;
    user.specialization = specialization || user.specialization;
    user.savedTimetables = savedTimetables || user.savedTimetables;
    user.addedTimetables = addedTimetables || user.addedTimetables;
    user.updatedTimetables = updatedTimetables || user.updatedTimetables;

    await user.save();

    res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete User Profile
export const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
