const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: String,
  name: String,
  email: String,
  password: String,
  address: String,
  phone: String,
  company: String,       
  website: String,
  blood_group:String,
  health_condition:String,
  emergency_contact:String
});

module.exports = mongoose.model('users', userSchema);
