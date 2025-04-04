/**
 * @file fairPriceShopController.js
 * @description Handles fair price shop-related CRUD operations.
 * @module controllers/fairPriceShopController
 */

import FairPriceShop from "../models/Fairpriceshop.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route   POST /api/fair-price-shops
 * @desc    Register a new fair price shop
 * @access  Public (To be secured later)
 */
export const createFairPriceShop = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber, aadharNumber } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !mobileNumber || !aadharNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const fairPriceShop = new FairPriceShop({ fullName, email, password, mobileNumber, aadharNumber });
    await fairPriceShop.save();

    res.status(201).json({ success: true, message: "Fair price shop registered successfully", fairPriceShop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   POST /api/fair-price-shops/login
 * @desc    Authenticate a fair price shop and get a JWT token
 * @access  Public
 */
export const loginFairPriceShop = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check if fair price shop exists
    const fairPriceShop = await FairPriceShop.findOne({ email });
    if (!fairPriceShop) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, fairPriceShop.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: fairPriceShop._id, email: fairPriceShop.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      token, 
      fairPriceShop: { id: fairPriceShop._id, email: fairPriceShop.email, fullName: fairPriceShop.fullName } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   GET /api/fair-price-shops
 * @desc    Retrieve all fair price shops
 * @access  Public
 */
export const getAllFairPriceShops = async (req, res) => {
  try {
    const fairPriceShops = await FairPriceShop.find();
    res.status(200).json({ success: true, fairPriceShops });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   GET /api/fair-price-shops/:id
 * @desc    Retrieve a single fair price shop by ID
 * @access  Public
 */
export const getFairPriceShopById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid fair price shop ID format" });
    }

    const fairPriceShop = await FairPriceShop.findById(id);
    if (!fairPriceShop) {
      return res.status(404).json({ success: false, message: "Fair price shop not found" });
    }

    res.status(200).json({ success: true, fairPriceShop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   PUT /api/fair-price-shops/:id
 * @desc    Update fair price shop details by ID
 * @access  Public (To be secured later)
 */
export const updateFairPriceShop = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid fair price shop ID format" });
    }

    const updatedFairPriceShop = await FairPriceShop.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFairPriceShop) {
      return res.status(404).json({ success: false, message: "Fair price shop not found" });
    }

    res.status(200).json({ success: true, message: "Fair price shop updated successfully", updatedFairPriceShop });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

/**
 * @route   DELETE /api/fair-price-shops/:id
 * @desc    Delete a fair price shop by ID
 * @access  Public (To be secured later)
 */
export const deleteFairPriceShop = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid fair price shop ID format" });
    }

    const fairPriceShop = await FairPriceShop.findByIdAndDelete(id);
    if (!fairPriceShop) {
      return res.status(404).json({ success: false, message: "Fair price shop not found" });
    }

    res.status(200).json({ success: true, message: "Fair price shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
