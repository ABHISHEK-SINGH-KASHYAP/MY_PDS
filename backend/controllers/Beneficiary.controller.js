/**
 * @file beneficiaryController.js
 * @description Handles beneficiary-related CRUD operations.
 * @module controllers/beneficiaryController
 */

import Beneficiary from "../models/Beneficiary.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route   POST /api/beneficiaries
 * @desc    Register a new beneficiary
 * @access  Public (To be secured later)
 */
export const createBeneficiary = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber, aadharNumber } = req.body;

    if (!fullName || !email || !password || !mobileNumber || !aadharNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const beneficiary = new Beneficiary({ fullName, email, password, mobileNumber, aadharNumber });
    await beneficiary.save();

    res.status(201).json({ success: true, message: "Beneficiary registered successfully", beneficiary });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   POST /api/beneficiaries/login
 * @desc    Authenticate a beneficiary and get a JWT token
 * @access  Public
 */
export const loginBeneficiary = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const beneficiary = await Beneficiary.findOne({ email });
    if (!beneficiary) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, beneficiary.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: beneficiary._id, email: beneficiary.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      
      beneficiary: { id: beneficiary._id, email: beneficiary.email, fullName: beneficiary.fullName, token:token,  } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   GET /api/beneficiaries
 * @desc    Retrieve all beneficiaries
 * @access  Public
 */
export const getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find();
    res.status(200).json({ success: true, beneficiaries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   GET /api/beneficiaries/:id
 * @desc    Retrieve a single beneficiary by ID
 * @access  Public
 */
export const getBeneficiaryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid beneficiary ID format" });
    }

    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) {
      return res.status(404).json({ success: false, message: "Beneficiary not found" });
    }

    res.status(200).json({ success: true, beneficiary });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   PUT /api/beneficiaries/:id
 * @desc    Update beneficiary details by ID
 * @access  Public (To be secured later)
 */
export const updateBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid beneficiary ID format" });
    }

    const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBeneficiary) {
      return res.status(404).json({ success: false, message: "Beneficiary not found" });
    }

    res.status(200).json({ success: true, message: "Beneficiary updated successfully", updatedBeneficiary });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   DELETE /api/beneficiaries/:id
 * @desc    Delete a beneficiary by ID
 * @access  Public (To be secured later)
 */
export const deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid beneficiary ID format" });
    }

    const beneficiary = await Beneficiary.findByIdAndDelete(id);
    if (!beneficiary) {
      return res.status(404).json({ success: false, message: "Beneficiary not found" });
    }

    res.status(200).json({ success: true, message: "Beneficiary deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
