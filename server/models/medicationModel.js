const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
  times: [{ type: String, required: true }], // HH:mm
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weekDays: [{ type: String, enum: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] }], // weekly only
});

module.exports = mongoose.model("Medication", medicationSchema);
