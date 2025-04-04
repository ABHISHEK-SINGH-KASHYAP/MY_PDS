/**
 * @file fairPriceShop.routes.js
 * @description Defines routes for fair price shop-related operations.
 * @module routes/fairPriceShopRoutes
 */

import express from "express";
import {
  createFairPriceShop,
  loginFairPriceShop,
  getAllFairPriceShops,
  getFairPriceShopById,
  updateFairPriceShop,
  deleteFairPriceShop,
} from "../controllers/Fairpriceshop.controller.js";

const router = express.Router();

// Register a new fair price shop
router.post("/register", createFairPriceShop);

// Login fair price shop
router.post("/login", loginFairPriceShop);

// Get all fair price shops
router.get("/", getAllFairPriceShops);

// Get a single fair price shop by ID
router.get("/:id", getFairPriceShopById);

// Update fair price shop details by ID
router.put("/:id", updateFairPriceShop);

// Delete a fair price shop by ID
router.delete("/:id", deleteFairPriceShop);

export default router;
