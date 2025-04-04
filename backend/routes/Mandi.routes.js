import express from "express";
import {
  createMandi,
  getAllMandis,
  getMandiById,
  updateMandi,
  deleteMandi,
  loginMandi
} from "../controllers/Mandi.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
    try {
      res.status(200).json({ success: true, message: "Mandis routes are working!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

/**
 * @route   POST /api/mandis
 * @desc    Create a new mandi
 * @access  Public
 */
router.post("/register", createMandi);

/**
 * @route   POST /api/mandis/login
 * @desc    Authenticate a mandi and get a token
 * @access  Public
 */
router.post("/login", loginMandi);

/**
 * @route   GET /api/mandis
 * @desc    Retrieve all mandis
 * @access  Public
 */
router.get("/", getAllMandis);

/**
 * @route   GET /api/mandis/:id
 * @desc    Retrieve a single mandi by ID
 * @access  Public
 */
router.get("/:id", getMandiById);

/**
 * @route   PUT /api/mandis/:id
 * @desc    Update a mandi by ID
 * @access  Public (To be secured with authentication later)
 */
router.put("/:id", updateMandi);

/**
 * @route   DELETE /api/mandis/:id
 * @desc    Delete a mandi by ID
 * @access  Public (To be secured with authentication later)
 */
router.delete("/:id", deleteMandi);

export default router;



// import express from "express";
// import {
//   createMandi,
//   getAllMandis,
//   getMandiById,
//   updateMandi,
//   deleteMandi
// } from "../controllers/Mandi.controller.js";

// const router = express.Router();

// router.get("/test", (req, res) => {
//     try {
//       res.status(200).json({ success: true, message: "Mandis routes are working!" });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   });

// /**
//  * @route   POST /api/mandis
//  * @desc    Create a new mandi
//  * @access  Public
//  */
// router.post("/", createMandi);

// /**
//  * @route   GET /api/mandis
//  * @desc    Retrieve all mandis
//  * @access  Public
//  */
// router.get("/", getAllMandis);

// /**
//  * @route   GET /api/mandis/:id
//  * @desc    Retrieve a single mandi by ID
//  * @access  Public
//  */
// router.get("/:id", getMandiById);

// /**
//  * @route   PUT /api/mandis/:id
//  * @desc    Update a mandi by ID
//  * @access  Public (To be secured with authentication later)
//  */
// router.put("/:id", updateMandi);

// /**
//  * @route   DELETE /api/mandis/:id
//  * @desc    Delete a mandi by ID
//  * @access  Public (To be secured with authentication later)
//  */
// router.delete("/:id", deleteMandi);

// export default router;
