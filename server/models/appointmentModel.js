const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  specialist: String,
  reason: String,
  time: String,
  date: String,
  uploaded_by: String
});

module.exports = mongoose.model('appointments', appointmentSchema);
