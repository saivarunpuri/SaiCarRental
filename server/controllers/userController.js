import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
//Generarte Web Token
const generateToken = (userId) => {
  const payload = userId;

  return jwt.sign(payload, process.env.JWT_SECRET);
};

//Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id.toString());
    res.status(201).json({
      success: true,
      user,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = generateToken(user._id.toString());
    res.status(200).json({
      success: true,
      user,
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get User data using token
export const getUserData = async (req, res) => {
  try {
    res
      .status(200)
      .json({
        success: true,
        user: req.user,
        message: "User data fetched successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all cars for the frontend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
