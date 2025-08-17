const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  role: String,
  name: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  company: String,       
  website: String ,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 
  },
  blood_group:String,
  health_condition:String,
  emergency_contact:String
});

module.exports = mongoose.model('otps', otpSchema);