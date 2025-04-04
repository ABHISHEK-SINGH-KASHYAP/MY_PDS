import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const fairPriceShopSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true },
//   shopLicenseNumber: { type: String, required: true, unique: true }, // Unique license number for Fair Price Shops
//   location: {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//   },
});

// Hash password before saving
fairPriceShopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const FairPriceShop = mongoose.model("FairPriceShop", fairPriceShopSchema);

export default FairPriceShop;
