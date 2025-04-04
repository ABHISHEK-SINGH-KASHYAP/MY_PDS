import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const beneficiarySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
//   rationCardNumber: { type: String, required: true, unique: true }, // Unique ration card number
//   familyMembers: { type: Number, required: true }, // Number of family members
//   incomeLevel: { type: String, required: true, enum: ["APL", "BPL", "Antyodaya"] }, // Income classification
//   location: {
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true }
//   }
});

// Hash password before saving
beneficiarySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

export default Beneficiary;
