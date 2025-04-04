import express from "express";
import {
  createWarehouse,
  loginWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse
} from "../controllers/Warehouse.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Warehouse routes are working!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   POST /api/warehouses
 * @desc    Create a new warehouse
 * @access  Public (To be secured later)
 */
router.post("/register", createWarehouse);

/**
 * @route   POST /api/warehouses/login
 * @desc    Authenticate a warehouse and get a JWT token
 * @access  Public
 */
router.post("/login", loginWarehouse);

/**
 * @route   GET /api/warehouses
 * @desc    Retrieve all warehouses
 * @access  Public
 */
router.get("/", getAllWarehouses);

/**
 * @route   GET /api/warehouses/:id
 * @desc    Retrieve a single warehouse by ID
 * @access  Public
 */
router.get("/:id", getWarehouseById);

/**
 * @route   PUT /api/warehouses/:id
 * @desc    Update warehouse details by ID
 * @access  Public (To be secured later)
 */
router.put("/:id", updateWarehouse);

/**
 * @route   DELETE /api/warehouses/:id
 * @desc    Delete a warehouse by ID
 * @access  Public (To be secured later)
 */
router.delete("/:id", deleteWarehouse);

export default router;