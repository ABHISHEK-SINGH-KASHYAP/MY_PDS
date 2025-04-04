/**
 * @file farmerController.js
 * @description Handles farmer-related CRUD operations.
 * @module controllers/farmerController
 */

import Farmer from "../models/Farmer.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route   POST /api/farmers/register
 * @desc    Create a new farmer
 * @access  Public (To be secured later)
 */
export const createFarmer = async (req, res) => {
  try {
    const { email, password, fullName, mobileNumber, aadharNumber } = req.body;

    // Validate required fields
    if (!email || !password || !fullName || !mobileNumber || !aadharNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const farmer = new Farmer({ email, password, fullName, mobileNumber, aadharNumber });
    await farmer.save();

    res.status(201).json({ success: true, message: "Farmer created successfully", farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    console.log(error);
  }
};

/**
 * @route   POST /api/farmers/login
 * @desc    Authenticate a farmer and get a JWT token
 * @access  Public
 */
export const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check if farmer exists
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: farmer._id, email: farmer.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      token, 
      farmer: { id: farmer._id, email: farmer.email, fullName: farmer.fullName } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/farmers
 * @desc    Retrieve all farmers
 * @access  Public
 */
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find()
    res.status(200).json({ success: true, farmers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/farmers/:id
 * @desc    Retrieve a single farmer by ID
 * @access  Public
 */
export const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid farmer ID format" });
    }

    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.status(200).json({ success: true, farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   PUT /api/farmers/:id
 * @desc    Update farmer details by ID
 * @access  Public (To be secured later)
 */
export const updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid farmer ID format" });
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFarmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.status(200).json({ success: true, message: "Farmer updated successfully", updatedFarmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   DELETE /api/farmers/:id
 * @desc    Delete a farmer by ID
 * @access  Public (To be secured later)
 */
export const deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid farmer ID format" });
    }

    const farmer = await Farmer.findByIdAndDelete(id);
    if (!farmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.status(200).json({ success: true, message: "Farmer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
