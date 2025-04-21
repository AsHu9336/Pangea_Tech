const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const FRONTEND_URL = "https://pangea-tech-frontend.onrender.com";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Create JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .json({ token, user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login called with email:", email); // Debugging line

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: "Token verification failed" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("forgotPassword called with email:", email); // Debugging line
  try {
    const user = await User.findOne({ email });
    console.log("User found:", user); // Debugging line
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;
    const html = `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`;

    await sendEmail(user.email, "Reset your password", html);

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: "Password is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { register, login,  verifyToken ,forgotPassword, resetPassword };
