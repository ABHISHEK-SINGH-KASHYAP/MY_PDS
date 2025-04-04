/**
 * @file farmerRoutes.js
 * @description Defines API routes for farmer-related operations.
 * @module routes/farmerRoutes
 * @requires express
 * @requires controllers/farmerController
 */

import express from "express";
import {
  createFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
  loginFarmer
} from "../controllers/Farmer.controller.js"; // Updated import to match file naming conventions

const router = express.Router();

/**
 * @route   GET /api/farmers/test
 * @desc    Test route to check if farmer routes are working
 * @access  Public
 */
router.get("/test", (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Farmer routes are working!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   POST /api/farmers/register
 * @desc    Create a new farmer
 * @access  Public (To be secured with authentication later)
 */
router.post("/register", createFarmer);

/**
 * @route   POST /api/farmers/login
 * @desc    Authenticate a farmer and return a token
 * @access  Public
 */
router.post("/login", loginFarmer);

/**
 * @route   GET /api/farmers
 * @desc    Retrieve all farmers
 * @access  Public
 */
router.get("/", getAllFarmers);

/**
 * @route   GET /api/farmers/:id
 * @desc    Retrieve a single farmer by ID
 * @access  Public
 */
router.get("/:id", getFarmerById);

/**
 * @route   PUT /api/farmers/:id
 * @desc    Update farmer details by ID
 * @access  Public (To be secured with authentication later)
 */
router.put("/:id", updateFarmer);

/**
 * @route   DELETE /api/farmers/:id
 * @desc    Delete a farmer by ID
 * @access  Public (To be secured with authentication later)
 */
router.delete("/:id", deleteFarmer);

export default router;
