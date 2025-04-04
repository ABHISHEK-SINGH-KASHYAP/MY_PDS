/**
 * @file beneficiary.routes.js
 * @description Routes for managing beneficiaries.
 * @module routes/beneficiaryRoutes
 */

import express from "express";
import { 
  createBeneficiary, 
  loginBeneficiary, 
  getAllBeneficiaries, 
  getBeneficiaryById, 
  updateBeneficiary, 
  deleteBeneficiary 
} from "../controllers/Beneficiary.controller.js";

const router = express.Router();

// Route for registering a new beneficiary
router.post("/register", createBeneficiary);

// Route for beneficiary login
router.post("/login", loginBeneficiary);

// Route for fetching all beneficiaries
router.get("/", getAllBeneficiaries);

// Route for fetching a single beneficiary by ID
router.get("/:id", getBeneficiaryById);

// Route for updating beneficiary details
router.put("/:id", updateBeneficiary);

// Route for deleting a beneficiary
router.delete("/:id", deleteBeneficiary);

export default router;
