
 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Db.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({extended:false}));
app.use(cors()); // Enable CORS for cross-origin requests

// Test Route
app.get("/", (req, res) => {
  res.send("API is running... Database connection successful!");
});

//API Endpoints
import farmerRoutes from "./routes/Farmer.routes.js";
import mandiRoutes from "./routes/Mandi.routes.js";
import warehouseRoutes from "./routes/Warehouse.routes.js";
import fairpriceshop from "./routes/Fairpriceshop.routes.js";
import beneficiary from "./routes/Beneficiary.routes.js";


app.use("/api/farmers", farmerRoutes);
app.use("/api/mandis", mandiRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/fairpriceshops", fairpriceshop);
app.use("/api/beneficiary", beneficiary);


// Define PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
