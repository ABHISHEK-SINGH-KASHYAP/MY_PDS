import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const FarmerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName:{type: String, required:  true},
  mobileNumber:{type:String, required: true},
  aadharNumber:{type: String, required:true}
});

FarmerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Farmer = mongoose.model('Farmer', FarmerSchema);

export default Farmer;



// import mongoose from "mongoose";

// const farmerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   contact: { type: String, required: true, unique: true },
//   location: { type: String, required: true },
//   crops: [{ type: String }], // List of crops farmer grows
//   mandi: { type: mongoose.Schema.Types.ObjectId, ref: "Mandi" } // Reference to mandi
// }, { timestamps: true });

// export default mongoose.model("Farmer", farmerSchema);
