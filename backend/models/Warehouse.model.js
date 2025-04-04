import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const warehouseSchema = new mongoose.Schema({
  fullName:{type: String, required:  true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber:{type:String, required: true},
  aadharNumber:{type: String, required:true}
});

warehouseSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Warehouse = mongoose.model('Warehouse', warehouseSchema);

export default Warehouse;
