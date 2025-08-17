const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  location: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  slots: { type: Number, required: true },
});

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialist: { type: String, required: true },
    contact: { type: String, required: true },
    schedule: [scheduleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("doctors", doctorSchema);

