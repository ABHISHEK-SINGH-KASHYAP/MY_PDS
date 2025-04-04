import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const mandiSchema = new mongoose.Schema({
  fullName:{type: String, required:  true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobileNumber:{type:String, required: true},
  aadharNumber:{type: String, required:true}
},);

mandiSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Mandi = mongoose.model('Mandi', mandiSchema);

export default Mandi;


// import mongoose from "mongoose";

// const mandiSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   location: { type: String, required: true },
//   capacity: { type: Number, required: true }, // Maximum capacity of the market
// }, { timestamps: true });

// export default mongoose.model("Mandi", mandiSchema);
