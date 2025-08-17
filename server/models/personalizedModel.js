const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bloodSugar: { type: Number, default: 0 },
  systolic: { type: Number, default: 0 },   // Upper BP
  diastolic: { type: Number, default: 0 },  // Lower BP
  stepCount: { type: Number, default: 0 },
  burnedCalories: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Personal', personalSchema);
