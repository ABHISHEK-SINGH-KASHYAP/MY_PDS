/**
 * @file warehouseController.js
 * @description Handles warehouse-related CRUD operations.
 * @module controllers/warehouseController
 */

import Warehouse from "../models/Warehouse.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @route   POST /api/warehouses
 * @desc    Create a new warehouse
 * @access  Public (To be secured later)
 */
export const createWarehouse = async (req, res) => {
  try {
    const { email, password, fullName, mobileNumber, aadharNumber } = req.body;

    if (!email || !password || !fullName || !mobileNumber || !aadharNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const warehouse = new Warehouse({ email, password, fullName, mobileNumber, aadharNumber });
    await warehouse.save();

    res.status(201).json({ success: true, message: "Warehouse created successfully", warehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   POST /api/warehouses/login
 * @desc    Authenticate a warehouse and get a JWT token
 * @access  Public
 */
export const loginWarehouse = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const warehouse = await Warehouse.findOne({ email });
    if (!warehouse) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, warehouse.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: warehouse._id, email: warehouse.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      token, 
      warehouse: { id: warehouse._id, email: warehouse.email, fullName: warehouse.fullName } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/warehouses
 * @desc    Retrieve all warehouses
 * @access  Public
 */
export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json({ success: true, warehouses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   GET /api/warehouses/:id
 * @desc    Retrieve a single warehouse by ID
 * @access  Public
 */
export const getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid warehouse ID format" });
    }

    const warehouse = await Warehouse.findById(id);
    if (!warehouse) {
      return res.status(404).json({ success: false, message: "Warehouse not found" });
    }

    res.status(200).json({ success: true, warehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   PUT /api/warehouses/:id
 * @desc    Update warehouse details by ID
 * @access  Public (To be secured later)
 */
export const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid warehouse ID format" });
    }

    const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedWarehouse) {
      return res.status(404).json({ success: false, message: "Warehouse not found" });
    }

    res.status(200).json({ success: true, message: "Warehouse updated successfully", updatedWarehouse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

/**
 * @route   DELETE /api/warehouses/:id
 * @desc    Delete a warehouse by ID
 * @access  Public (To be secured later)
 */
export const deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid warehouse ID format" });
    }

    const warehouse = await Warehouse.findByIdAndDelete(id);
    if (!warehouse) {
      return res.status(404).json({ success: false, message: "Warehouse not found" });
    }

    res.status(200).json({ success: true, message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
