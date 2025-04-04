import Mandi from "../models/Mandi.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc    Create a new mandi
 * @route   POST /api/mandis
 * @access  Public
 */
export const createMandi = async (req, res) => {
  try {
    const { email, password, fullName, mobileNumber, aadharNumber } = req.body;

    // Check if a mandi with the same email already exists
    const existingMandi = await Mandi.findOne({ email });
    if (existingMandi) {
      return res.status(400).json({ success: false, message: "Mandi already exists" });
    }

    

    const mandi = new Mandi({ email, password, fullName, mobileNumber, aadharNumber });
    await mandi.save();

    res.status(201).json({ success: true, mandi,message:"mandis created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Login mandi
 * @route   POST /api/mandis/login
 * @access  Public
 */
export const loginMandi = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if mandi exists
    const mandi = await Mandi.findOne({ email });
    if (!mandi) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, mandi.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: mandi._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token, mandi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all mandis
 * @route   GET /api/mandis
 * @access  Public
 */
export const getAllMandis = async (req, res) => {
  try {
    const mandis = await Mandi.find();
    res.status(200).json({ success: true, mandis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get a single mandi by ID
 * @route   GET /api/mandis/:id
 * @access  Public
 */
export const getMandiById = async (req, res) => {
  try {
    const mandi = await Mandi.findById(req.params.id);

    if (!mandi) {
      return res.status(404).json({ success: false, message: "Mandi not found" });
    }

    res.status(200).json({ success: true, mandi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a mandi by ID
 * @route   PUT /api/mandis/:id
 * @access  Public (To be secured with authentication later)
 */
export const updateMandi = async (req, res) => {
  try {
    const updatedMandi = await Mandi.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedMandi) {
      return res.status(404).json({ success: false, message: "Mandi not found" });
    }

    res.status(200).json({ success: true, updatedMandi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a mandi by ID
 * @route   DELETE /api/mandis/:id
 * @access  Public (To be secured with authentication later)
 */
export const deleteMandi = async (req, res) => {
  try {
    const mandi = await Mandi.findByIdAndDelete(req.params.id);

    if (!mandi) {
      return res.status(404).json({ success: false, message: "Mandi not found" });
    }

    res.status(200).json({ success: true, message: "Mandi deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









// import Mandi from "../models/Mandi.model.js";

// /**
//  * @desc    Create a new mandi
//  * @route   POST /api/mandis
//  * @access  Public
//  */
// export const createMandi = async (req, res) => {
//   try {
//     const { email, password, fullName, mobileNumber, aadharNumber } = req.body;

//     // Check if a mandi with the same name already exists
//     const existingMandi = await Mandi.findOne({ email });
//     if (existingMandi) {
//       return res.status(400).json({ success: false, message: "Mandi already exists" });
//     }

//     const mandi = new Mandi({ email, password, fullName, mobileNumber, aadharNumber });
//     await mandi.save();

//     res.status(201).json({ success: true, mandi });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @desc    Get all mandis
//  * @route   GET /api/mandis
//  * @access  Public
//  */
// export const getAllMandis = async (req, res) => {
//   try {
//     const mandis = await Mandi.find();
//     res.status(200).json({ success: true, mandis });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @desc    Get a single mandi by ID
//  * @route   GET /api/mandis/:id
//  * @access  Public
//  */
// export const getMandiById = async (req, res) => {
//   try {
//     const mandi = await Mandi.findById(req.params.id);

//     if (!mandi) {
//       return res.status(404).json({ success: false, message: "Mandi not found" });
//     }

//     res.status(200).json({ success: true, mandi });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @desc    Update a mandi by ID
//  * @route   PUT /api/mandis/:id
//  * @access  Public (To be secured with authentication later)
//  */
// export const updateMandi = async (req, res) => {
//   try {
//     const updatedMandi = await Mandi.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     if (!updatedMandi) {
//       return res.status(404).json({ success: false, message: "Mandi not found" });
//     }

//     res.status(200).json({ success: true, updatedMandi });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @desc    Delete a mandi by ID
//  * @route   DELETE /api/mandis/:id
//  * @access  Public (To be secured with authentication later)
//  */
// export const deleteMandi = async (req, res) => {
//   try {
//     const mandi = await Mandi.findByIdAndDelete(req.params.id);

//     if (!mandi) {
//       return res.status(404).json({ success: false, message: "Mandi not found" });
//     }

//     res.status(200).json({ success: true, message: "Mandi deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
